var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/ultimos/", function (req, res) {
    graficoController.buscarUltimosChamados(req, res);
});

router.get("/tempo-real/", function (req, res) {
    graficoController.buscarChamadosEmTempoReal(req, res);
})

module.exports = router;