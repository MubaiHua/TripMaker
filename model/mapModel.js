const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    code: {
        type: String,
        required: true
    },

    points: [{
        type: String,
    }],
})

module.exports = MapModel = mongoose.model('map', MapSchema);