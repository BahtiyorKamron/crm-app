const model = require('../repositories/davomat')
const joi = require('../validation/joi')

module.exports = class Davomat {
    static async get(req,res){
        try{
            let davomat = await model.get(req.params.id)
            if(davomat.error) throw new Error(davomat.error)
            res.status(200).json({
                message:"Davomat",
                data:davomat,
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
    static async post(req,res){
        try{
            let post_davomat = await model.post(req.body)
            console.log(post_davomat)
            if(post_davomat.error) throw new Error(post_davomat.error)
            res.status(200).json({
                message:"Davomat ochildi",
                data:post_davomat,
                status:200
            })
        }catch (e) {
            res.status(404).json({
                message:e.message,
                data:null,
                status:404
            })
        }
    }
    static async put(req,res){
        try{
            let validationResult = await joi.joi1.validate({id:req.body.id,participate:req.body.participate,ball:req.body.ball})
            if (validationResult.error) throw new Error(validationResult.error.details[0].message)
             let update_davomat = await model.put(req.body)
            if(update_davomat.error) throw new Error(update_davomat.error)
            res.status(200).json({
                message:"O'zgartirildi",
                data:update_davomat,
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
            let delete_davomat = await model.delete(req.body)
            if( delete_davomat.error ) throw new Error( delete_davomat.error )
            res.status(200).json({
                message:"Muvaffaqiyatli o'chirildi",
                data : delete_davomat,
                status : 200
            })
        }catch (e) {
            res.status(404).json({
                message:e.message,
                data:null,
                status:404
            })
        }
    }
}