const model = require("../repositories/anonym_chat")

module.exports = class AnonymChat{
    static async post(req,res){
        try{
            let post_message = await model.post(req.body)
            if( post_message.error ) throw new Error( post_message.error )
            res.status(200)
               .json({
                   message : "Message",
                   data : post_message,
                   status : 200
               })
        }catch(e){
            res.status(404)
               .json({
                   message : e.message,
                   data : null,
                   status : 400
               })
        }
    }
    static async get(req,res){
        try{
           let get_message = await model.get(req.params.id)
           if( get_message.error ) throw new Error(get_message.error)
           res.status(200)
              .json({
                  message : "Message",
                  data : get_message,
                  status : 200
              })
        }catch(e){
            res.status(404)
               .json({
                   message : e.message,
                   data : null,
                   status : 400
               })
        }
    }
    static async delete(req,res){
        try{
            let target = req.params.id || req.body.id
            let delete_message = await model.delete(target)
            if(delete_message.error) throw new Error(delete_message.error)
            res.status(200)
               .json({
                   message : "Deleted Message",
                   data : delete_message,
                   status : 200
               })
        }catch(e){
            res.status(404)
               .json({
                   message : e.message,
                   data : null,
                   status : 400
               })
        }
    }
    static async put(req,res){
        try{
            let edit_message = await model.put(req.body)
            if( edit_message.error ) throw new Error(edit_message.error)
            res.status(200)
               .json({
                   message : "O'zgartirldi",
                   data : edit_message,
                   status : 200
               })
        }catch(e){
            res.status(404)
               .json({
                   message : e.message,
                   data : null,
                   status : 400
               })
        }
    }
}