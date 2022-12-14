var database = require("../database/config")

function confirmar_chamado(monitor, motivo, contato) {
    console.log("ACESSEI O CHAMADOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",monitor, motivo, contato);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO chamados (IdMonitor, Motivo, Contato, Momento) VALUES (${monitor}, '${motivo}', '${contato}', CURDATE());
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    confirmar_chamado
};