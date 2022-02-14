const pg = require("../utils/pg")

module.exports = class AnonymChat{
    static async post(message){
        try{
            let post_message = await pg(true,"insert into anonymous_chat(chat) values($1) returning *",message)
            if(!post_message) throw new Error("Xatolik")
            else return post_message
        }catch(e){
            return { error : e.message }
        }
    }
    static async get(id){
        try{
            let get_message = await pg(true,"select * from anonymous_chat where id=$1",id)
            if(!get_message) throw new Error("Xatolik")
            else return get_message
        }catch(e){
            return { error : e.message }
        }
    }
    static async delete(id){
        try{
            if(!id) throw new Error("ID kiritilmagan")
            let deleted_message = await pg(true,"delete from anonmous_chat where id=$1 returning *",id)
            if(!deleted_message) throw new Error("Xatolik")
            else return deleted_message
        }catch(e){
            return { error : e.message }
        }
    }
    static async put(id,name){
        try{
            if(!id) throw new Error("ID kiritilmagan")
            let edited_message = await pg(true,`
            with old_data as(
                select * from anonymous_chat where id=$1
            )update anonymous_chat set
            chat = (
                case
                    when length($2)>0 then $2
                    else o.chat
                end
            )from old_data as o
            where anonymous_chat.id=$1
            returning anonymous_chat.*
            `,id,name)
            if(!edited_message) throw new Error("Xatolik")
            else return edited_message
        }catch(e){
            return { error : e.message }
        }
    }
}