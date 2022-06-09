const express = require("express");
const { Rooms } = require("../models");
const router = express.Router();

//for a single room
router.get("/:id", async (req, res) => {
    try {
        res.json(await Rooms.findById(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;