import userModel from "../models/user.model.js"
import sessionModel from "../models/session.model.js"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt_token_gen.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import config from "../config/config.js"
import { ref } from "process"

// --- Register User ---
export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  // --- input validation ---
  if (!username?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({
      message: "All fields are required"
    })
  }

  try {
    // --- check whether the user is already exists ---
    const isAlreadyExist = await userModel.findOne({
      $or: [
        { username },
        { email }
      ]
    });

    if (isAlreadyExist) {
      return res.status(409).json({
        message: "User already exists.",
      })
    }

    // --- hash password ---
    const hashedPassword = await bcrypt.hash(password, 12);

    // --- create new user ---
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    })

    // --- check wheather the user is created or not ---
    if (!user) {
      return res.status(500).json({
        message: "Failed to create user."
      });
    }

    // --- Generate refresh token ---
    const refreshToken = generateRefreshToken({ id: user._id, });

    // - Hash refresh token ---
    const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");

    // --- Create session ---
    const session = await sessionModel.create({
      user: user._id,
      refreshToken: hashedRefreshToken,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    })

    // --- Generate access token ---
    const accessToken = generateAccessToken({ id: user._id, role: user.role, sessionId: session._id });

    // --- set cookie ---
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })


    // --- Send response ---
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      accessToken
    })

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }

}


// --- Get My det ---
export async function getMe(req, res) {

  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}


// --- Login user ---
export async function loginUser(req, res) {
  const { email, password } = req.body;

  // --- input validation ---
  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({
      message: "All fields are required"
    })
  }

  try {

    // --- check wheather the user is exists or not ---
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    // --- Validate password ---
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    // --- Generate refresh token ---
    const refreshToken = generateRefreshToken({ id: user.id });

    // --- Hashed refresh token ---
    const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");

    // --- create session ---
    const session = await sessionModel.create({
      user: user.id,
      refreshToken: hashedRefreshToken,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    })

    // --- Create access token ---
    const accessToken = generateAccessToken({ id: user.id, sessionId: session._id, role: user.role });

    // --- Set cookie and return response ---
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        username: user.username,
        email: user.email
      },
      accessToken
    })

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

// --- Rotate tokens ---
export async function refreshTokens(req, res) {
  const refreshToken = req.cookies.refreshToken;

  // --- check wheather refresh token is comming from client ---
  if (!refreshToken) {
    return res.status(409).json({
      message: "Refresh token is not found"
    })
  }

  const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");

  try {

    // --- Search for session ---
    const session = await sessionModel.findOne({
      refreshToken: hashedRefreshToken,
      revoked: false
    })

    if (!session) {
      return res.status(401).json({
        message: "Invalid refresh token"
      })
    }

    // --- verify refreshToken ---
    const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);

    // --- create new refresh token ---
    const newRefreshToken = generateRefreshToken({ id: decoded.id });
    const hashedNewRefreshToken = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

    // --- Update session ---
    session.refreshToken = hashedNewRefreshToken;
    await session.save()

    // --- fetch user ---
    const user = await userModel.findById(decoded.id);

    // --- verify user ---
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // --- Create new access token ---
    const accessToken = generateAccessToken({ id: user._id, sessionId: session._id, role: user.role })

    // --- Set cookie and return accessToken
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken,
      user:{
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    })

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

// --- Logout user ---
export async function logoutUser(req, res) {

  // --- check for refreshToken ---
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");

  try {

    // --- chech whether session is exists or not ---
    const session = await sessionModel.findOne({
      refreshToken: hashedRefreshToken,
      revoked: false
    });

    if (!session) {
      return res.status(401).json({
        message: "Invalid refresh token"
      })
    }

    // --- logout logic ---
    session.revoked = true;
    await session.save();

    // --- clear cookie ---
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    }); // use same option (use set cookie)

    // --- response msg ---
    res.status(200).json({
      message: "Logged out successfully"
    })

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }

}

// --- Logout all ---
export async function logoutAllUser(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  try {

    const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);

    const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex")

    // --- validation purpose only ---
    const session = await sessionModel.findOne({
      refreshToken: hashedRefreshToken,
      revoked: false,
    });

    // --- validation ---
    if (!session) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }


    await sessionModel.updateMany({
      user: decoded.id,
      revoked: false
    }, {
      revoked: true
    })

    // --- cookie clear ---
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logout from all devices successfully"
    })

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }

}