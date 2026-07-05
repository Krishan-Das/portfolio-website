import imageKitClient from "../config/imagekit.js"

export async function uploadFile(file, originalname,userId, folder){
  const extension = originalname.split(".").pop();
  const fileName = `Project-${userId}-${Date.now()}.${extension}`;

  try {
    const response = await imageKitClient.files.upload({
      file: file.buffer.toString("base64"),
      fileName,
      folder
    })
    
    return response;
  } catch (error) {
    throw error
  }
}


export async function deleteFile(fileId){
  if(!fileId) return;

  try {
    await imageKitClient.files.delete(fileId);
  } catch (error) {
    throw error
  }
}