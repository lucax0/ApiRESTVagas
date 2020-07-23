// Lucas Uesato
// Teste MatchBox
const express = require('express');
const { uuid , isUuid } = require('uuidv4');
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

function validateUId(request, response, next){
    const { id} = request.params;
  
    if(!isUuid(id)){
      return response.status(400).json({ "error": "Invalid Repositorie ID" });
    }
  
    return next();
  }


app.use(logRequests)

//Vagas

app.get("/vagas", (request, response) => {
    return response.json();
});

app.post("/vagas", (request, response) => {
    const { titulo, descricao, data_limite, numero_vagas } = request.body;
    const vaga = { id: uuid(), titulo: titulo, descricao: descricao,data_limite: data_limite, numero_vagas: numero_vagas, candidatos : []};

    mongoDB.saveVagas(vaga);

    return response.json(vaga);
});

app.put("/vagas/:id",validateUId, (request, response) => {
    const { id } = request.params;
    const { titulo, descricao, data_limite, numero_vagas } = request.body;
    return response.json();
});

app.delete("/vagas/:id",validateUId, (request, response) => {
    const { id } = request.params;
    return response.status(204).send();
})

//Canditados

app.post("/candidatos", (request, response) => {
    const { cpf, nome, email, senha } = request.body;
    return response.json();
});

app.get("/candidatos", (request, response) => {
    return response.json();
});

app.put("/candidatos/:id",validateUId, (request, response) => {
    const { id } = request.params;
    const { nome,senha } = request.body;
    return response.json();
});


app.delete("/candidatos/:id",validateUId, (request, response) => {
    const { id } = request.params;
    return response.status(204).send();
})




module.exports = app;