const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userGameSchema = Schema({
    userId: {type: ObjectId, required: true },
    gameId: {type: ObjectId, required: true },
    played: {type: Boolean, required: true},
    owned: {type: Boolean, required: true},
    wantToPlay: {type: Boolean, required: true}
})

const UserGame = mongoose.model('UserGame', userGameSchema);

module.exports = UserGame