const express = require("express");
const req = require("express/lib/request");
const { Reviews, Rooms } = require("../models");
const router = express.Router();

//for user reviews
router.get("/:roomId", async(req,res) =>{
    try {
        res.json(await Reviews.findOne({ room: req.params.roomId}));
    } catch (error) {
        res.status(400).json(error);
    }
});

//for user reviews and ratings
router.post("/:roomId", async (req, res) => {
    try {
        await Reviews.updateOne(
            {
                room: req.params.roomId //assigns the _id from the room
            },
            {
                review: req.body.comment,
                room: req.params.locationId, //assign the _id from the location
            },
            {
                upsert: true, // requesting to update the object if it exists or insert if it does not
            }
        );
        // if review update is successful
        res.status(200).send("Updated Sucessfully!")
    } catch (error) {
        res.status(400).json(error);
    }
});

// update route
// delete route
router.delete("/:roomId", async (req, res) => {
    try {
        res.json(
            await Rooms.findOneAndDelete({
                room: req.params.roomId,
            })
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;