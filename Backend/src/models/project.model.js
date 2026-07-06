import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Project must belong to a user"],
  },
  title: {
    type: String,
    required: [true, "Project title is required"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Project description is required"],
  },

  technologies: [
    {
      type: String,
      trim: true,
    },
  ],

  githubUrl: {
    type: String,
    default: "",
  },

  liveUrl: {
    type: String,
    default: "",
  },

  image: {
    url: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    }
  },

  featured: {
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: true,
  }
);

const projectModel = mongoose.model("Projects", projectSchema);

export default projectModel;