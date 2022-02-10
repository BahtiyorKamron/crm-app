const router = require("express").Router()
const AnonymChat = require("../controllers/anonym_chat")

router.route("/anonym-chat")
      .post(AnonymChat.post)
      .get(AnonymChat.get)
      .delete(AnonymChat.delete)
      
module.exports = router

// freetuts.download