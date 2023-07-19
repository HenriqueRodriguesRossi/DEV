const mongoose = require("mongoose")
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

function connect(){
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@noticias.bcqjj9x.mongodb.net/?retryWrites=true&w=majority`)

    const connection = mongoose.connection

    connection.on("open", ()=>{
        console.log("Conectado com sucesso!")
    })

    connection.on("error", ()=>{
        console.log("Erro ao se conectar!")
    })
}

connect()
module.exports = mongoose