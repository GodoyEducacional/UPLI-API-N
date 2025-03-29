// Importa para interagir com o banco de dados
const mongoose = require("mongoose");

// Carrega váriaveis de ambiente do arquivo .ENV
require("dotenv").config();

// Configura o mongoose para permitir  consulta (Restritas)
mongoose.set("strictQuery", true);

// Função para conectar ao DB
async function main() {
  await mongoose
    .connect
    // Link do DB
    ();

  // Exibe a mensagem ao úsuario que realizou a conexão
  console.log("Conectou ao banco de dados!");
}

// Caso ocorra erro mostra uma mensagem
main().catch((err) => console.log(err));

// Exportar a função para utilizar em outro arquivo
module.exports = main;
