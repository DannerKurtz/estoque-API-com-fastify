import { randomUUID } from "crypto";
import { sql } from "./db.js";


export class Estoque {
    async create(item) {
        const id = randomUUID();
        const { nome } = item;
        await sql`INSERT INTO estoque (id, nome) VALUES (${id}, ${nome})`
    }

    async list(search) {
        let item;
        if (search) {
            item = await sql`SELECT * FROM estoque WHERE nome ILIKE ${'%' + search + '%'}`
        } else {
            item = await sql`SELECT * FROM estoque`
        }
        return item

    }

    async update(id, item) {
        const { nome } = item;

        await sql`UPDATE estoque SET nome = ${nome} WHERE id = ${id}`
    }

    async delete(id) {

        await sql`DELETE FROM estoque WHERE id = ${id}`
    }
}

export class Produto {
    async create(item) {
        const id = randomUUID();
        const { nome, quantidade } = item;
        await sql`INSERT INTO produto (id, nome, quantidade) VALUES (${id}, ${nome}, ${quantidade})`
    }

    async list(search) {
        let item;
        if (search) {
            item = await sql`SELECT * FROM produto WHERE nome ILIKE ${'%' + search + '%'}`
        } else {
            item = await sql`SELECT * FROM produto`
        }
        return item

    }

    async update(id, item) {
        const { nome, quantidade } = item;

        await sql`UPDATE produto SET nome = ${nome}, quantidade = ${quantidade} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`DELETE FROM produto WHERE id = ${id}`
    }
}

export class PosicaoDoEstoque {
    async create(item) {
        const id = randomUUID();
        const { nome, id_estoque, id_produto } = item;
        await sql`INSERT INTO pos_estoque (id, nome, id_estoque, id_produto) VALUES (${id}, ${nome}, ${id_estoque}, ${id_produto})`
    }

    async list(search) {
        let item;
        if (search) {
            item = await sql`
            SELECT pos_estoque.id,
            pos_estoque.nome AS pos_estoque_nome,
            estoque.nome AS estoque_nome,
            produto.nome AS produto_nome,
            produto.quantidade AS quantidade_produto
            FROM pos_estoque
            JOIN estoque ON pos_estoque.id_estoque = estoque.id
            JOIN produto ON pos_estoque.id_produto = produto.id
            WHERE pos_estoque.nome ILIKE ${'%' + search + '%'} 
            `
        } else {
            item = await sql`
            SELECT pos_estoque.id,
                   pos_estoque.nome AS pos_estoque_nome,
                   estoque.nome AS estoque_nome,
                   produto.nome AS produto_nome,
                   produto.quantidade AS quantidade_produto
            FROM pos_estoque
            JOIN estoque ON pos_estoque.id_estoque = estoque.id
            JOIN produto ON pos_estoque.id_produto = produto.id
            `
        }
        return item
    }

    async update(id, item) {
        const { nome, id_estoque, id_produto } = item;
        await sql`UPDATE pos_estoque SET nome = ${nome}, id_estoque = ${id_estoque}, id_produto = ${id_produto} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`DELETE FROM pos_estoque WHERE id = ${id}`
    }
}

export class Pesquisa {
    async countEstoque() {
        return await sql`
        SELECT e.nome AS estoque_nome,
        COUNT(pe.id) AS total_pos_estoque
        FROM estoque e
        LEFT JOIN pos_estoque pe ON e.id = pe.id_estoque
        GROUP BY e.nome
        ORDER BY e.nome;
        `
    }
    async countEstoqueProduto(){
        return await sql`
        SELECT pe.id_estoque,
        e.nome AS estoque_nome,
        SUM(p.quantidade) AS total_quantidade_produtos
        FROM pos_estoque pe
        JOIN estoque e ON pe.id_estoque = e.id
        JOIN produto p ON pe.id_produto = p.id
        GROUP BY pe.id_estoque, e.nome
        ORDER BY e.nome;
`
    }
}