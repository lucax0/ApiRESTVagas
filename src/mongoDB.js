// https://mongoosejs.com/docs/guide.html DOC MONGOOSE
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://apiTest:743xBtWtHSFLtSCC@cluster0-fcpmn.gcp.mongodb.net/matchbox?authMechanism=SCRAM-SHA-1', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = {
 saveVagas: async function () {
    const Cat = mongoose.model('vagas', { name: String });// Definindo uma model "Formato" do objeto para ser salvo no mongodDB


    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));
},

saveCandidatos: async function () {
    const Cat = mongoose.model('vagas', { name: String });

    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));
}

}
