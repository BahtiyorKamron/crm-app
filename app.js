const express = require('express')
const app = express()
const config = require('./config/server')
const pg = require('./utils/pg')
const MiddleWare = require('./middleware/middleware')
const User = require('./routers/user')
const Login = require('./routers/login')

app.use( express.json() )
app.use( MiddleWare.middle )
app.use( User )
app.use( Login )

app.listen(config.PORT,()=>console.log(`http://localhost:${config.PORT}`))
