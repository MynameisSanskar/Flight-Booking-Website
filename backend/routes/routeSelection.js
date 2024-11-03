var express = require('express');
var router = express.Router();
var bus = require('../models/Buses');

// Route to fetch buses based on startCity and destination
router.post('/', (req, res) => {
    console.log("Received request:", req.body);
    
    // Fetch buses from the database based on startCity and destination
    bus.find({ 
        startCity: req.body.startCity, 
        destination: req.body.destination 
    })
    .exec((err, buses) => {
        if (err) {
            console.error("Error while searching:", err);
            return res.status(500).json({ status: false, message: "Error while searching", error: err });
        }

        // Log the retrieved buses
        console.log("Buses found:", buses);

        // Send the list of buses as a response
        res.json({ status: true, buses });
    });
});

module.exports = router;
