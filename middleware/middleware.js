const jwt = require('../utils/jwt')
module.exports = class MiddleWare {
  static async middle(req,res,next){
   try {
       let for_super_admin = [
           '/user',
           '/teachers',
           '/guruh',
           '/davomat',
           '/join_user',
           '/anonym-chat',
           '/tolov',
           '/user/students/'
       ]
       if(req.url === '/login') return next()

       if(req.headers.cookie){
           let token = req.headers.cookie.split('=')[1]
           let verified_token = jwt.verify(token)
           if(!['1','2'].includes(verified_token) && for_super_admin.includes(req.url) ){
               throw new Error("Sizda buni amalga oshirish uchun ruhsat yo'q")
           }else{
               next()
           }
       }
       else throw new Error('Siz tizimga kirmagansiz!')

   } catch (e) {
      res.status(500).json({
        status:500,
        message : e.message,
        data : null
      })
   }
  }
}
