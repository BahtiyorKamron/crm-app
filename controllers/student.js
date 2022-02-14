const model = require("../repositories/student.js")
const student = require("../validation/joi").schema
module.exports = class Students {
  static async get(req,res){
    try {
      let students = await model.get( req.params.id )
      if( !students ) throw new Error("Check your connection")
      if( students.error ) throw new Error( students.error )
      res.status(200)
         .json({
           message : "O'quvchilar",
           data : students,
           status : 200
         })
    } catch (e) {
      res.status(404)
         .json({
           message : e.message,
           data : null,
           status : 404
         })
    }
  }
  static async post(req,res){
    try {
        let validation = student.validate(({
          name: req.body.name,
          lastname:  req.body.lastname,
          age: req.body.age,
          phone1: req.body.phone1,
          phone2: req.body.phone2,
          groupId:  req.body.groupId,
          directionId: req.body.directionId,
          password:  req.body.password
        }))

        if (validation.error) throw new Error((validation.error.details[0].message))
        let post_student = await model.post(req.body)
        if( !post_student ) throw new Error("Check your connection")
        if( post_student.error ) throw new Error(post_student.error)
        res.status(201)
           .json({
             message : "Yangi o'quvchi qo'shildi",
             data : post_student,
             status : 201
           })
    } catch (e) {
      res.status(404)
         .json({
           message : e.message,
           data : null,
           status : 404
         })
    }
  }
  static async delete(req,res){
    try {
      let target = req.params.id || req.body.id
      let delete_student = await model.delete(target)
      if( !delete_student ) throw new Error(delete_student)
      if( delete_student.error ) throw new Error(delete_student.error)
      res.status(200)
         .json({
           message : "O'chirildi",
           data : delete_student,
           status : 200
         })
    } catch (e) {
      res.status(404)
         .json({
           message : e.message,
           data : null,
           status : 404
         })
    }
  }
  static async put(req,res){
    try{
        
        let edit_student = await model.put( req.body )
        if( !edit_student ) throw new Error("Check your connection")
        if( edit_student.error ) throw new Error( edit_student.error )
        res.status(200)
           .json({
             message : "O'zgartirildi",
             data : edit_student,
             status : 200
           })

    }catch(e){
      res.status(400)
      .json({
        message : e.message,
        data : null,
        status : 400
      })
    }
  }
}
