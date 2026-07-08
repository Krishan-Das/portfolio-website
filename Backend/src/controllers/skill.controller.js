// import SkillModel from "../models/skills.model";
// export const create = async (req, res)=>{
//   const userId = req.user.id;
//   const {category, name, level} = req.body;

//   if(!category?.trim() || !name?.trim() || !level?.trim()){
//     return res.status(400).json({
//       message: "All fields are required"
//     })
//   }

//   const skill = await SkillModel.create({
//     user: userId,
//     category: category,
//     items:
//   })


// }