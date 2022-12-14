var express = require("express");
var router = express.Router();

var chamadosController = require("../controllers/chamadosController");

router.get("/testar", function (req, res) {
    chamadosController.testar(req, res);
});

router.get("/listar", function (req, res) {
    chamadosController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função confirmar_chamado() de chamadosController.js
router.post("/confirmar_chamado", function (req, res) {
    chamadosController.confirmar_chamado(req, res);
})

module.exports = router;