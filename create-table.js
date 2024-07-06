import { sql } from "./db.js";

// sql`
//     CREATE TABLE estoque (
//         id VARCHAR(50) PRIMARY KEY,
//         nome VARCHAR(100)
//     );
//      CREATE TABLE produto (
//         id VARCHAR(50) PRIMARY KEY,
//         nome VARCHAR(100),
//         quantidade INTEGER
//     )
// CREATE TABLE pos_estoque (
//     id VARCHAR(50) PRIMARY KEY,
//     nome VARCHAR(100),
//     id_estoque VARCHAR(50) REFERENCES estoque(id),
//     id_produto VARCHAR(50) REFERENCES produto(id)
// )
// `.then(() => {
//     console.log("Tabelas, criadas");
// })

