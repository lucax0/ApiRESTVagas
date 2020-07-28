// https://mongoosejs.com/docs/guide.html DOC MONGOOSE
const mongoose = require('mongoose');

const mongooseString = 'mongodb+srv://apiTest:743xBtWtHSFLtSCC@cluster0-fcpmn.gcp.mongodb.net/matchbox?authMechanism=SCRAM-SHA-1';
const VagaModel = mongoose.model('vagas', { id: String, titulo: String, descricao: String, data_limite: Date, numero_vagas: String, candidatos: Array });
// Definindo uma model "Formato" do objeto para ser salvo no mongodDB
const CandidatoModel = mongoose.model('candidatos', { id: String, cpf: String, nome: String, email: String, senha: String });
// MODEL DEVE SER UMA VAR GLOBAL SE N EM TD CHAMADA ELE TENTA CRIAR UM SCHEMA

mongoose.connect(mongooseString, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {

    setVagas: async function (data) {
        const vagas = new VagaModel(data);

        vagas.save().then(() => { console.log('Vaga OK'); });
    },

    updateVagas: async function(id,data) {
        const result = VagaModel.findOneAndUpdate({id: id},data);
        return result
    },

    setCandidatos: async function (data) {
        const candidato = new CandidatoModel(data);

        candidato.save().then(() => console.log('Candidato OK'));
    },

    getAllByType: async function (type) {
        //Dessa forma economiza linhas de codigo sendo que uma mesma function pesquisa para os 2
        return type == "v" ? await VagaModel.find() : await CandidatoModel.find();
    },
    
    getOneByType: async function (id, type) {
        return type == "v" ? await VagaModel.find({ id: id }) : await CandidatoModel.find({ id: id });
    },

    deleteOneByType: async function (id, type) {
        return type == "v" ? await VagaModel.findOneAndDelete({ id: id }) : await CandidatoModel.findOneAndDelete({ id: id });
    }

}
