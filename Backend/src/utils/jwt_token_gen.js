import config from "../config/config.js";
import jwt from "jsonwebtoken"

export function generateAccessToken(payload){
  return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

export function generateRefreshToken(payload){
  return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
}