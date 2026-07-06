import { uploadFile, deleteFile } from "../services/imagekit.service.js";
import projectModel from "../models/project.model.js"



export async function createPost(req, res) {
  const { title, description, technologies, githubUrl, liveUrl, featured } = req.body;
  const userId = req.user.id;

  if (!title || !description) {
    return res.status(400).json({
      message: "All fields are required"
    })
  }

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Project image is required"
      });
    }

    const uploadResponse = await uploadFile(
      file,
      file.originalname,
      userId,
      "portfolio/projects"
    );

    if (!uploadResponse) {
      return res.status(500).json({
        message: "Image upload failed"
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
      image: {
        url: uploadResponse.url,
        fileId: uploadResponse.fileId
      },
    });

    const savedProject = await newProject.save();

    return res.status(201).json({
      message: "Project created successfully",
      project: savedProject
    });

  } catch (error) {
    console.error("Create projects error", error);
    return res.status(500).json({
      errorMsg: error.message,
      message: "Internal server problem",
    });
  }
}

export async function fetchPost(req, res) {
  const userId = req.user.id;

  try {
    const projects = await projectModel.find({ user: userId });

    res.status(200).json({
      message: "Projects fetched successfully",
      projects
    })
  } catch (error) {
    console.error("Fetch projects error:", error);
    return res.status(500).json({
      errorMsg: error.message,
      message: "Internal server problem",
    });
  }
}

export async function updatePost(req, res) {
  const userId = req.user.id;
  const projectId = req.params.id;
  const { title, description, technologies, githubUrl, liveUrl, featured } = req.body;
  const file = req.file;


  // --- Input validations ---

  if (!title || !description) {
    return res.status(400).json({
      message: "All fields are required"
    })
  }


  try {

    const project = await projectModel.findOne({ _id: projectId, user: userId });

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      })
    }

    if (file) {
      // --- delete prev image from imagekit
      if (project.image?.fileId) {
        await deleteFile(project.image.fileId);
      }

      // --- upload new image into imagekit ---
      const uploadResponse = await uploadFile(
        file,
        file.originalname,
        userId,
        "portfolio/projects"
      );

      if (!uploadResponse) {
        return res.status(500).json({
          message: "Image upload failed"
        });
      }

      project.image.url = uploadResponse.url;
      project.image.fileId = uploadResponse.fileId;
    }

    // --- update database ---
    project.title = title;
    project.description = description;
    project.githubUrl = githubUrl;
    project.liveUrl = liveUrl;
    project.technologies = technologies;
    project.featured = featured;
    await project.save();

    return res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);
    return res.status(500).json({
      errorMsg: error.message,
      message: "Internal server problem",
    });
  }
}

export async function deletePost(req, res) {
  const userId = req.user.id;
  const projectId = req.params.id;
  try {

    const project = await projectModel.findOne({ _id: projectId, user: userId });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      })
    }

    if (project.image?.fileId) {
      await deleteFile(project.image.fileId);
    }

    await project.deleteOne();
    res.status(200).json({
      message: "Project deleted successfully",
      deletedProject: project
    })


  } catch (error) {
    console.error("Delete project error:", error);
    return res.status(500).json({
      message: "Internal server problem",
    });
  }
}