// Lucas Uesato
// Teste MatchBox
const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const mongoDB = require('./mongoDB')

const { request, response } = require('express');

const app = express();

app.use(express.json());

function logRequests(request, response, next) {
    const { method, url } = request;

    const log = `[${method}] ${url}`;//template string ES6

    console.time(log);
    next();
    console.timeEnd(log);
}

function validateUId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ "error": "Invalid ID" });
    }

    return next();
}


app.use(logRequests)

//VAGAS
//Econtrar todas as vagas
app.get("/vagas", async (request, response) => {
    try {
        const results = await mongoDB.getAllByType('v');
        return response.json(results);
    } catch (error) {
        return response.status(400).json({ "error": `Error co consolidar DB -> ${error}` });
    }
});
// Encontrar 1 vaga
app.get("/vagas/:id", validateUId, async (request, response) => {
    const { id } = request.params;
    const result = await mongoDB.getOneByType(id, 'v');

    return response.json(result);
});

app.post("/vagas", (request, response) => {
    const { titulo, descricao, data_limite, numero_vagas } = request.body;
    const data = { id: uuid(), titulo: titulo, descricao: descricao, data_limite: data_limite, numero_vagas: numero_vagas, candidatos: [] };

    mongoDB.setVagas(data);

    return response.status(201).json(data);
});

//Adicionar o candidato a uma ou mais vagas
app.post("/vagas/addcandidato/:id", validateUId, (request, response) => {
    const { idcand } = request.params;
    return response.json();
});

//Remover o candidato a vaga
app.post("/vagas/:idvaga/removecandidato/:idcand", validateUId, (request, response) => {
    const { idvaga, idcand } = request.params;
    return response.status(204).send();
});

app.put("/vagas/:id", validateUId, (request, response) => {
    const { id } = request.params;
    const { titulo, descricao, data_limite, numero_vagas } = request.body;
    const data = { titulo: titulo, descricao: descricao, data_limite: data_limite, numero_vagas: numero_vagas }

    try {
        const result = mongoDB.updateVagas(id, data);
        return response.json({ "sucess": `Update OK on ID -> ${id}` });
    } catch (error) { 
        return response.status(400).json({ "error": `Error co consolidar DB -> ${error}` });
    }

});

app.delete("/vagas/:id", validateUId, (request, response) => {
    const { id } = request.params;
    try {
        mongoDB.deleteOneByType(id , 'v')
        return response.status(204).send();
    } catch (error) {
        return response.status(400).json({ "error": `Error co consolidar DB -> ${error}` });
    }
    
})

//CANDIDATOS

app.post("/candidatos", (request, response) => {
    const { cpf, nome, email, senha } = request.body;
    const data = { id: uuid(), cpf: cpf, nome: nome, email: email, senha: senha }

    mongoDB.setCandidatos(data);

    return response.status(201).json(data);
});

app.get("/candidatos", (request, response) => {
    return response.json();
});

app.put("/candidatos/:id", validateUId, (request, response) => {
    const { id } = request.params;
    const { nome, senha } = request.body;
    return response.json();
});


app.delete("/candidatos/:id", validateUId, (request, response) => {
    const { id } = request.params;
    return response.status(204).send();
})


module.exports = app;