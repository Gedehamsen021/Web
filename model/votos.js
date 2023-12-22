const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    voto: {
        type: String,
        required: true
    },
    pontos: {
        type: String,
        required: true
    }
})

const Voto = mongoose.model('Voto', VoteSchema);
module.exports = Voto;