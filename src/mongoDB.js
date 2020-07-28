// https://mongoosejs.com/docs/guide.html DOC MONGOOSE
const mongoose = require('mongoose');

const mongooseString = 'mongodb+srv://apiTest:743xBtWtHSFLtSCC@cluster0-fcpmn.gcp.mongodb.net/matchbox?authMechanism=SCRAM-SHA-1';

const Vaga = mongoose.model('vagas', { id: String, titulo: String, descricao: String,data_limite: Date, numero_vagas: String, candidatos : Array});
// Definindo uma model "Formato" do objeto para ser salvo no mongodDB
const CandidatoModel = mongoose.model('candidatos', {id: String, cpf: String, nome: String, email: String, senha: String } );
// MODEL DEVE SER UMA VAR GLOBAL SE N EM TD CHAMADA ELE TENTA CRIAR UM SCHEMA

mongoose.connect(mongooseString , {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = {
    
 saveVagas: async function (data) {
    const vagas = new Vaga(data);

    vagas.save().then(() => {console.log('Vaga OK');});
},

saveCandidatos: async function (data) {

    const candidato = new CandidatoModel(data);
    candidato.save().then(() => console.log('Candidato OK'));
}

}
