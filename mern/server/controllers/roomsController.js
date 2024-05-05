const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

module.exports = {
    createRoom: async (req, res, next) => {
        const hotelID = req.params.hotelID;
        const newRoom = new Room(req.body);
    
        try {
            const savedRoom = await newRoom.save();
            await Hotel.findByIdAndUpdate(hotelID, {$push: {rooms: savedRoom._id}});
            res.status(200).json(savedRoom);
        }
        catch(err) {
            next(err);
        }
    },
    updateRoom: async (req, res, next) => {
        try {
            const roomID = req.params.id;
            const updatedRoom = await Room.findByIdAndUpdate(roomID, {$set: req.body}, {new: true});
            res.status(200).json(updatedRoom);
        }
        catch(err) {
            next(err);
        }
    },
    deleteRoom: async (req, res, next) => {
        try {
            const roomID = req.params.id;
            await Room.findByIdAndDelete(roomID);
            res.status(200).json({success: true});
        }
        catch(err) {
            next(err);
        }
    },
    getRoom: async (req, res, next) => {
        try {
            const roomID = req.params.id;
            const room = await Room.findById(roomID);
            res.status(200).json(room);
        }
        catch(err) {
            next(err);
        }
    },
    getAllRoom: async (req, res, next) => {
        try {
            const rooms = await Room.find();
            res.status(200).json(rooms);
        }
        catch(err) {
            next(err);
        }
    }
};