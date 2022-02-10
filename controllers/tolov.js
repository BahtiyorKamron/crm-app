const model = require('../repositories/tolov')

module.exports = class Tolov {
    static async post(req,res){
       try{
           let post_tolov = await model.post(req.body)
           if(post_tolov.error) throw new Error(post_tolov.error)
           res.status(200).json({
               message : "To'lov turlari",
               data : post_tolov,
               status : 200
           })
       }catch (e) {
           res.status(404).json({
               message : e.message,
               data:null,
               status:404
           })
       }
    }
    static async get(req,res){
        try{
            let get_tolov_tizim = await model.get(req.params.id)
            if( get_tolov_tizim.error ) throw new Error(get_tolov_tizim.error)
            res.status(200).json({
                message : "Mavjud tolov turlari",
                data : get_tolov_tizim ,
                status : 200
            })
        }catch (e) {
            res.status(404).json({
                message : e.message,
                data:null,
                status:404
            })
        }
    }
    static async put(req,res){
        try{
            let update_tolov = await model.put(req.body)
            if( update_tolov.error ) throw new Error( update_tolov.error )
            res.status(200).json({
                message : "O'zgartirildi",
                data : update_tolov,
                status : 200
            })
        }catch (e) {
            res.status(404).json({
                message : e.message,
                data:null,
                status:404
            })
        }
    }
    static async delete(req,res){
        try{
            let target = req.params.id || req.body.id
            let delete_tolov = await model.delete(target)
            if( delete_tolov.error ) throw new Error( delete_tolov.error )
            res.status(200).json({
                message : "Muvvaffaqiyatli o'chirildi",
                data : delete_tolov,
                status : 200
            })
        }catch (e) {
            res.status(404).json({
                message : e.message,
                data:null,
                status:404
            })
        }
    }
}