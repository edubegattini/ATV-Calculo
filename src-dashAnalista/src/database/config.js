const mysql = require('mysql2');

var mySqlConfig = {
    host: "localhost",
    database: "chamados",
    user: "root",
    password: "#Gf52666863832",
}

// CONEXÃO DO SQL SERVER - AZURE (NUVEM)
var sqlServerConfig = {
    server: "healthsystem.database.windows.net",
    database: "healthsystem",
    user: "grupo01sis",
    password: "#GfHealthSystem01",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
    }
}

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '#Gf52666863832',
    database: 'chamados'
});

connection.connect((err) => {
    if (err) return console.log(err);
    console.log('Conectou!');
    createTable(connection);
})


function executar(instrucao) {
    // VERIFICA A VARIÁVEL DE AMBIENTE SETADA EM app.js
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        return new Promise(function (resolve, reject) {
            sql.connect(sqlServerConfig).then(function () {
                return sql.query(instrucao);
            }).then(function (resultados) {
                console.log(resultados);
                resolve(resultados.recordset);
            }).catch(function (erro) {
                reject(erro);
                console.log('ERRO: ', erro);
            });
            sql.on('error', function (erro) {
                return ("ERRO NO SQL SERVER (Azure): ", erro);
            });
        });
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        return new Promise(function (resolve, reject) {
            var conexao = mysql.createConnection(mySqlConfig);
            conexao.connect();
            conexao.query(instrucao, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    reject(erro);
                }
                console.log(resultados);
                resolve(resultados);
            });
            conexao.on('error', function (erro) {
                return ("ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage);
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        });
    }
}


function createTable(conn) {
    const sql = `CREATE TABLE IF NOT EXISTS chamados(
             IdChamado int AUTO_INCREMENT,
             IdMonitor int NOT NULL,
             Motivo varchar(15) NOT NULL,
             Contato varchar(30) NOT NULL,
             Momento DATE NOT NULL,
             PRIMARY KEY (IdChamado)
             )auto_increment = 1000;`;

    conn.query(sql, (error, results, fields) => {
        if (error) return console.log(error);
        console.log('Criou a tabela!');
    });
}

module.exports = {
    executar
}