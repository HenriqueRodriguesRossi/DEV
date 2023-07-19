const NoticiasModel = require("../models/Noticias")

module.exports = class NoticiasController {
    static async cadastraNoticia(req, res) {
        const { titulo, conteudo, categoria } = req.body

        if (!titulo || !conteudo || !categoria) {
            return res.status(500).send({
                mensagem: "Todos os campos são obrigatórios!"
            })
        }

        if (titulo < 5) {
            return res.status(500).send({
                mensagem: "O título deve ter no mínimo 5 caracteres!"
            })
        } else if (conteudo < 10) {
            return res.status(500).send({
                mensagem: "O conteúdo deve ter no mínimo 5 caracteres!"
            })
        } else if (categoria < 4) {
            return res.status(500).send({
                mensagem: "A categoria deve ter no mínimo 4 caracteres!"
            })
        }

        try {
            const novaNoticia = new NoticiasModel({
                titulo,
                conteudo,
                categoria
            })

            await novaNoticia.save()

            return res.status(201).send({
                mensagem: "Notícia cadastrada com sucesso!"
            })
        } catch (error) {
            return res.status(500).send({
                mensagem: "Erro ao cadastrar notícia!"
            },
                console.log(error)
            )
        }
    }

    static async buscaPorCategoria(req, res) {
        const { categoria } = req.body

        if (!categoria) {
            return res.status(500).send({
                mensagem: "Digite alguma categoria para ser buscada!"
            })
        }

        try {
            const existeCategoria = await NoticiasModel.find({ categoria: { $regex: new RegExp(categoria, 'i') } });

            if (existeCategoria.length === 0) {
                return res.status(404).send({
                    mensagem: "Nenhuma notícia encontrada!"
                });
            }            

            return res.status(200).send({
                sucesso: `${existeCategoria}`
            })
        } catch (error) {
            return res.status(500).send({
                mensagem: "Erro ao procurar categoria!"
            },
                console.log(error)
            )
        }
    }

    static async buscaPorTitulo(req, res) {
        const { titulo } = req.body

        if (!titulo) {
            return res.status(500).send({
                mensagem: "Título é obrigatório"
            })
        }

        try {
            const tituloExiste = await NoticiasModel.find({ titulo: { $regex: new RegExp(titulo, 'i') } })

            if (tituloExiste.length === 0) {
                return res.status(404).send({
                    mensagem: "Nenhuma notícia encontrada!"
                });
            }

            res.status(200).send({
                mensagem: `${tituloExiste}`
            })
        }catch(error){
            return res.status(500).send({
                mensagem: "Erro ao retornar as notícias!"
            },
                console.log(error)
            )
        }
    }
}