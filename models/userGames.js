const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userGameSchema = Schema({
    userId: mongoose.ObjectId,
    gameId: mongoose.ObjectId,
    played: {type: Boolean, required: true, default: false},
    owned: {type: Boolean, required: true, default: false},
    wantToPlay: {type: Boolean, required: true, default: false}
})

const UserGame = mongoose.model('UserGame', userGameSchema);

module.exports = UserGame