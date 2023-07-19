const express = require("express")
const app = express()
require("dotenv").config()
require("./db/connect")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(8080, ()=>{
    console.log("Servidor rodando!")
})

const NoticiasRouter = require("./router/NoticiaRouter")
app.use(NoticiasRouter)