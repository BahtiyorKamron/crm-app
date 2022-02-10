const pg = require('../utils/pg')

module.exports = class User {
  static async join_user({name,lastname,age,phone1,phone2,groupId,password,directionId}) {
      try {
          // if(role==1 || role=='1') return { error: "Bu huquqni bera olmaysiz ( role - 1)"}
        let users = await pg(false,`select * from users where archive='true' `)
        let group = await pg(true,"select * from groups where id=$1",groupId)
        if(!group) throw new Error("Bunday guruh ochilmaganer")
        let user = users.find(u => u.name==name  && u.password==password)
        if(!user){
          let login = await pg(true,`insert into users(name,lastname,password,phone1,phone2,role,age,group_id,direction) values(
            $1,$2,$3,$4,$5,case
            when $6<>1 then $6
            else 0 
            end
            ,$7,$8,$9) returning * `,name,lastname,password,phone1,phone2,5,age,groupId,directionId)
          return login
        }
        else{
          return {message:"Bunday user mavjud"}
        }
      } catch (e) {
        return { error : e.message }
      }

  }
  static async show_user({id}){
      try{
          let users = null
          if(!id){
               users = await pg(false,`select * from users`)
          }
          else{
               users = await pg(false,'select * from users where id=$1',id)
          }
          if( users ){
              return users
          } else{
              return { message : "userlar yo'q" }
          }
      }catch (e){
          console.log(e.message)
      }
  }
  static async edit_user({id,name,lastname,age,phone1,phone2,archive,role,password,group_id}){
      try{

          if(!id) return { error:"id bo'sh"}

          let edite_user = await pg(true,`
      with old_data as (
           select 
                 name,
                 lastname,
                 group_id,
                 role,
                 phone1,
                 phone2,
                 password,
                 archive
           from users where id=$1
      )update users set
            name = (
                case 
                    when length($2)>1 then $2
                    else o.name
                end 
            ),
            lastname = (
                case 
                    when length($3)>1 then $3
                    else o.lastname
                end                     
            ),
            password = (
                case
                    when length($4)>8 then $4
                    else o.password
                end
            ),
            phone1 = (
                case 
                     when length($5)=12 then $5
                     else o.phone1
                end
            ),
            phone2 = (
                case 
                     when length($6)=12 then $6
                     else o.phone2
                end
            ),
            role = (
                case 
                    when $7<>1 then $7
                    else o.role
                end 
            ),
            group_id = (
                case 
                    when $8>0 then $8
                    else o.group_id
                end
            ),
            archive = ( 
                case 
                    when ($9=true or $9=false) then $9
                    else o.archive
                end
               
            )
            from old_data as o
            where users.id = $1
            returning users.*
`,id,name,lastname,password,phone1,phone2,role,group_id,archive)
          if(edite_user) return edite_user


      }catch (e){
          return { error: e.message }
      }
  }
  static async delete({id}){
      try{
          if(id==1) throw new Error("Bu userni o'chira olmaysiz")
          // let users = await pg(false,'select * from users where id=$1',id)
          let delete_user = await pg(true,'delete from users where id=$1 returning *',id)
          if(!delete_user) throw new Error("Siz o'chirmoqchi bo'lgan user topilmadi")
          if(delete_user) return delete_user
      }catch (e){
          return { error: e.message }
      }

  }
}
