var chamadosModel = require("../models/chamadosModel");

var sessoes = [];

function confirmar_chamado(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var monitor = req.body.monitorServer;
    var motivo = req.body.motivoServer;
    var contato = req.body.contatoServer;
    
    console.log(monitor)
    console.log(motivo)
    console.log(contato)

    // Faça as validações dos valores
    if (monitor == undefined) {
        res.status(400).send("Seu id do monitor está undefined!");
    } else if (contato == undefined) {
        res.status(400).send("Seu contato está undefined!");
    } else if (motivo == undefined) {
        res.status(400).send("Seu motivo está undefined!");
    } else {
        
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        chamadosModel.confirmar_chamado(monitor, motivo, contato)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o chamado! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    confirmar_chamado
}