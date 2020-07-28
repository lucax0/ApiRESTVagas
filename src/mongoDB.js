// https://mongoosejs.com/docs/guide.html DOC MONGOOSE
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://apiTest:743xBtWtHSFLtSCC@cluster0-fcpmn.gcp.mongodb.net/matchbox?authMechanism=SCRAM-SHA-1', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = {
 saveVagas: async function (vaga) {
    console.log(vaga);
    const Vaga = mongoose.model('vagas', { id: String, titulo: String, descricao: String,data_limite: Date, numero_vagas: String, candidatos : Array});// Definindo uma model "Formato" do objeto para ser salvo no mongodDB

    const vagas = new Vaga(vaga);
    vagas.save().then(() => console.log('Vaga OK'));
},

saveCandidatos: async function (candidatos) {
    const CandidatoModel = mongoose.model('candidatos', {id: String, cpf: String, nome: String, email: String, senha: String } );

    const candidato = new CandidatoModel({ candidatos });
    candidato.save().then(() => console.log('Candidato OK'));
}

}
