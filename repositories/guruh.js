const pg = require('../utils/pg')
module.exports = class Guruh {
    static async get(id) {
        try {

            if (id) {
                let guruh = await pg(false, "select * from groups where id=$1", id)
                if (guruh.length) {
                    return guruh
                } else throw new Error("Topilmadi!")
            } else {
                let guruhlar = await pg(false, "select * from groups ")

                if (guruhlar) {
                    return guruhlar
                } else throw new Error("Topilmadi")
            }

        } catch (e) {
            return {error: e.message}
        }
    }

    static async post({name, teacherId, directionId}) {
        try {
            let date = new Date()
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();
            let vaqt = (year+"-"+month+"-"+dt)

            let post_guruh = await pg(true, `insert into groups(name,teacher_id,direction_id,create_at) values($1,$2,$3,$4) returning *`, name, teacherId, directionId, vaqt)

            if (post_guruh) {
                let update_teacher = await pg(true,"update users set group_id= $1 where id=$2 returning *",post_guruh.id,teacherId)
                if(!update_teacher) throw new Error("Xatoli")
                return post_guruh
            } else throw new Error("Xatolik")
        } catch (e) {
            return {error: e.message}
        }
    }

    static async put({id, name, teacherId, deletedAt, active,directionId}) {
        try {
            if (!id) throw new Error("ID kiritilmagan")
            let updated_guruh = await pg(true, `
         with old_data as (
         select * from groups where id=$1
         )update groups set 
         name = (
              case 
                  when length($2)>0 then $2
                  else o.name
              end 
         ),
         teacher_id = (
             case 
                 when $3>0 then $3
                 else o.teacher_id
             end
         ),
         direction_id = (
             case 
                 when $4>0 then $4
                 else o.direction_id
             end
         ),
        deleted_at = (
             case
                 when length($5)>0 then $5::timestamp
                 else o.deleted_at
             end
       ),
       active = (
             case 
                 when ($6=1 and o.active=true) then false 
                 when ($6=1 and o.active=false) then true
             end
       )
         from old_data as o
             where groups.id = $1
             returning groups.*
         `, id, name,teacherId,directionId,deletedAt,active)
            if (updated_guruh) {
                return updated_guruh
            } else throw new Error("O'zgartirilmadi")
        } catch (e) {
            return {error: e.message}
        }
    }
    static async delete(id){
        try{
            let deleted_group = await pg(true,`delete from groups where id=$1 returning *`,id)
            if(deleted_group) { return deleted_group }
            else throw new Error("Xatoli")
        }catch (e){
            return { error : e.message }
        }
    }
}
// }
//     ,
//     active = (
// case
// when $5=1 then true
// when $5=0 then false
// else o.active
// end
// )
//     ,
//     deleted_at = (
// case
// when length($5)>0 then $5
// else o.deleted_at
// end
// )
