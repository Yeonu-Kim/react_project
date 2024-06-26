const mongoose = require("mongoose");
const { Schema } = mongoose;

const HotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hoteltype: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true        
    },
    address: {
        type: String,
        required: true        
    },
    distance: {
        type: String,
        required: true        
    },
    photos: {
        type: [String],
        required: true        
    },
    title: {
        type: String,
        required: true   
    },
    desc: {
        type: String,
        required: true        
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0       
    },
    // list of Room model id
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }],
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        defualt: false
    }
})

const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = Hotel;