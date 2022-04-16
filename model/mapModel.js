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
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        }
    }],
})

module.exports = MapModel = mongoose.model('map', MapSchema);