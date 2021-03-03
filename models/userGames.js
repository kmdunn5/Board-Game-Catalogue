const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userGameSchema = Schema({
    userId: {type: String, required: true },
    gameId: {type: String, required: true },
    played: {type: Boolean, required: true, default: false},
    owned: {type: Boolean, required: true, default: false},
    wantToPlay: {type: Boolean, required: true, default: false}
})

const UserGame = mongoose.model('UserGame', userGameSchema);

module.exports = UserGame