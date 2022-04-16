const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    code: {
        type: String,
        required: true
    },

    points: [{
        description: {
            type: String,
        },
        lat: {
            type: Double,
            requried: true,
        },
        lng: {
            type: Double,
            required: true,
        },
        index: {
            type: Integer,
            required: true,
        }
    }],
})

module.exports = MapModel = mongoose.model('map', MapSchema);