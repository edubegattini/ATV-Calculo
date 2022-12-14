var graficoModel = require("../models/graficoModel");

function buscarUltimosChamados(req, res) {

    const limite_linhas = 7;

    var idChamado = req.params.idChamado;

    console.log(`Recuperando os ultimos ${limite_linhas} chamados`);

    graficoModel.buscarUltimosChamados(idChamado, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimos Chamados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarChamadosEmTempoReal(req, res) {

    var idChamado = req.params.idChamado;

    console.log(`Recuperando Chamados em tempo real`);

    graficoModel.buscarChamadosEmTempoReal(idChamado).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos chamados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimosChamados,
    buscarChamadosEmTempoReal
}