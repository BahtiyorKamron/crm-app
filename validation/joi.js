const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastname: Joi.string()
       .alphanum()
       .min(3)
       .max(30)
       .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(8)
        .max(16)
        .required(),

    age: Joi.number()
        .integer()
        .required(),
    phone1:Joi.string()
        .min(12)
        .max(12)
        .required(),
    phone2:Joi.string()
        .min(12)
        .max(12)
        .required(),
    group_id:Joi.number(),
    role:Joi.number()
         .required(),
    archive:Joi.boolean()


})
const signup = Joi.object({

    username: Joi.string()
       .alphanum()
       .min(3)
       .max(30)
       .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(8)
        .max(16)
        .required(),


})
module.exports = {
  schema,signup
}
