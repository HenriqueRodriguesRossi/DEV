const router = require("express").Router()
const NoticiasController = require("../controllers/NoticiasController")

router.post("/cadastrarNoticia", NoticiasController.cadastraNoticia)
router.get("/listaPorCategoria", NoticiasController.buscaPorCategoria)
router.get("/listaPorTitulo", NoticiasController.buscaPorTitulo)

module.exports = router