const mongoose = require('mongoose');
const Schema = mongoose.Schema

const gameSchema = new Schema({
    name: {type: String, require: true},
    year: Number,
    description: String,
    designer: String,
    publisher: String,
    playerCount: String,
    rating: {type: Number, max: 10, min: 0},
    complexity: {type: String, max: 5, min: 0},
    played: Boolean,
    wantToPlay: Boolean,
    owned: Boolean,
    image: String
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;