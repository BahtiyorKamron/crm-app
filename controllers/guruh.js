const model = require('../repositories/guruh')
const validate = require('../validation/joi')
const {colours} = require("nodemon/lib/config/defaults");

module.exports = class Guruh {
   static async get(req,res){
     try {
        let guruhlar = await model.get(req.params.id)
        if(guruhlar.error) throw new Error(guruhlar.error)
        res.status(200).json({
          message:"Mavjud guruhlar",
          data:guruhlar,
          status:200
        })
     } catch (e) {
       res.status(404).json({
         message:e.message,
         data:null,
         status:404
       })
     }
   }
   static async post(req,res){
     try {
        let validationResult = await validate.guruh.validate({name:req.body.name,directionId:req.body.directionId,teacherId:req.body.teacherId})
        if (validationResult.error) throw new Error(validationResult.error.details[0].message)

        let post_guruh = await model.post(req.body)
        if(post_guruh.error) throw new Error(post_guruh.error)
        res.status(200).json({
          message:"Yangi guruh ochildi",
          data:post_guruh,
          status:200
        })

     } catch (e) {
       res.status(404).json({
         message:e.message,
         data:null,
         status:404
       })
     }
   }
   static async put(req,res){
       try{
          let update_guruh = await model.put(req.body)
           if(update_guruh.error) throw new Error(update_guruh.error)
           res.status(200).json({
               message:"Muvaffaqiyatli o'zgartirildi!",
               data:update_guruh,
               status:200
           })
       }catch (e){
           res.status(404).json({
               message:e.message,
               data:null,
               status:404
           })
       }
   }
   static async delete(req,res){
       try{
           let target = req.params.id || req.body.id
           let delete_guruh = await model.delete(target)
           if(delete_guruh.error) throw new Error(delete_guruh.error)
           res.status(200).json({
               message:"Muvaffaqiyatli o'chirildi!",
               data:delete_guruh,
               status:200
           })
       }catch (e){
           res.status(404).json({
               message:e.message,
               data:null,
               status:404
           })
       }
   }
}
