const mongoose = require("mongoose")

const Noticias = new mongoose.Schema({
    titulo:{
        type: String,
        require: true
    },
    conteudo: {
        type: String,
        require: true
    },
    categoria:{
        type: String,
        require: true
    }
}, {timeseries: true})

module.exports = mongoose.model("Noticias", Noticias)