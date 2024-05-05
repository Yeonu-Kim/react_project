const Hotel = require("../models/Hotel");

module.exports = {
    createHotel: async (req, res, next) => {
        const newHotel = new Hotel(req.body);
        try {
            const savedHotel = await newHotel.save();
            res.status(200).json(savedHotel);
        }
        catch(err) {
            next(err);
        }
    },
    updateHotel: async (req, res, next) => {
        try {
            const hotelID = req.params.id;
            const updatedHotel = await Hotel.findByIdAndUpdate(hotelID, {$set: req.body}, {new: true});
            res.status(200).json(updatedHotel);
        }
        catch(err) {
            next(err);
        }
    },
    deleteHotel: async (req, res, next) => {
        try {
            const hotelID = req.params.id;
            await Hotel.findByIdAndDelete(hotelID);
            res.status(200).json({success: true});
        }
        catch(err) {
            next(err);
        }
    },
    getHotel: async (req, res, next) => {
        try {
            const hotelID = req.params.id;
            const hotel = await Hotel.findById(hotelID);
            res.status(200).json(hotel);
        }
        catch(err) {
            next(err);
        }
    },
    getAllHotel: async (req, res, next) => {
        try {
            const hotels = await Hotel.find();
            res.status(200).json(hotels);
        }
        catch(err) {
            next(err);
        }
    }
};