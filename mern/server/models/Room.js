const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: [{
        number: Number,
        unavailableDates: [{
            type: Date
        }]
    }]
    /*
    {
        number: 101, unavailableDates: [2024-01-03, 2024-01-05],
        number: 102, unavailableDates: [2024-01-03, 2024-01-05]
    }
    */
}, {timestamps: true})

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;