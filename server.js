import { fastify } from "fastify";
import { Estoque, Produto, PosicaoDoEstoque, Pesquisa } from "./database-postgres.js";
import { request } from "http";

const server = fastify();
const estoque = new Estoque;
const produto = new Produto;
const posEstoque = new PosicaoDoEstoque;
const pesquisa = new Pesquisa;

server.post("/estoque", async (request, reply) => {
    const { nome } = request.body;
    
    await estoque.create({
        nome,
    });

    return reply.status(201).send();
})

server.get("/estoque", async (request) => {
    const search = request.query.search;

    return estoque.list(search);
})

server.put('/estoque/:id', (request, reply) => {
    const id = request.params.id;

    const {nome} = request.body;

    estoque.update(id, {
        nome,
    })
    
    
    return reply.status(204).send();

})

server.delete("/estoque/:id", (request, reply) => {
    const id = request.params.id;
    estoque.delete(id);
    return reply.status(204).send();
})

server.post("/produtos", async (request, reply) => {
    const {nome, quantidade} = request.body;

    await produto.create({
        nome, 
        quantidade,
    })

    return reply.status(201).send();
});

server.get("/produtos", async (request) => {
    const search = request.query.search;
    return produto.list(search);
})

server.put("/produtos/:id", async (request, reply) => {
    const id = request.params.id;
    const {nome , quantidade} = request.body;

    produto.update(id, {
        nome,
        quantidade,
    });
})

server.delete("/produtos/:id", async (request, reply) => {
    produto.delete(request.params.id)

    return reply.status(204).send();
})

server.post("/pos-estoque", async (request, reply) => {
    const {nome, id_estoque, id_produto} = request.body

    posEstoque.create({
        nome,
        id_estoque,
        id_produto,
    });

    return reply.status(201).send();
})

server.get("/pos-estoque", async (request) =>{
    const search = request.query.search;
    return await posEstoque.list(search);
})

server.put("/pos-estoque/:id", async (request, reply) => {
    const id = request.params.id;
    const {nome, id_estoque, id_produto} = request.body;

    posEstoque.update(id, {
        nome,
        id_estoque,
        id_produto,
    });

    return reply.status(204).send();
})

server.delete("/pos-estoque/:id", async (request, reply) => {
    posEstoque.delete(request.params.id);
    return reply.status(204).send();
})

server.get("/pesquisa/count-estoque", async(request) => {
    return pesquisa.countEstoque();
})

server.get("/pesquisa/count-estoque-produtos", async (request) =>{
    return pesquisa.countEstoqueProduto();
})

server.listen({
    port:3000,
})