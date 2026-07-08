import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    items: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        level: {
          type: String,
          enum: ["Expert", "Advanced", "Intermediate", "Learning"],
          default: "Intermediate",
        },
      },
    ],
  },
  { timestamps: true }
);


export default mongoose.model("Skill", SkillSchema);