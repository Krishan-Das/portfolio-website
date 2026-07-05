import { uploadFile } from "../services/imagekit.service.js";
import projectModel from "../models/project.model.js"


export async function createPost(req, res) {
  const { title, description, technologies, githubUrl, liveUrl, featured, images } = req.body;
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  if (!title || !description) {
    return res.status(400).json({
      message: "All fields are required"
    })
  }

  try {
    const file = req.file;

    let uploadedImages = [];

    if (file) {
      const uploadResponse = await uploadFile(
        file,
        file.originalname,
        userId,
        "portfolio/projects"
      );

      uploadedImages.push({
        url: uploadResponse.url,
        fileId: uploadResponse.fileId,
      });
    }

    const newProject = new projectModel({
      user: userId,
      title,
      description,
      technologies,
      githubUrl,
      liveUrl,
      featured: featured === "true" || featured === true,
      images: uploadedImages,
    });

    const savedProject = await newProject.save();

    return res.status(201).json({
      message: "Project created successfully",
      project: savedProject
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errorMsg: error.message,
      message: "Internal server problem",
    });
  }
}