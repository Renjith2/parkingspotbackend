const express = require("express");
const ParkingSpot = require("../Schema/parkpsotSchema");
const User = require('../Schema/UserSchema')

const spotDetails=async (req, res) => {
    try {
        const parkingSpots = await ParkingSpot.find({});
        res.status(200).json(parkingSpots);
    } catch (error) {
        console.error("Error fetching parking spots:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const updateSpot =async (req, res) => {
    const { spotID, vehicleNumber, duration,charge } = req.body;
    console.log(req.body)

    

    if (!spotID || !vehicleNumber || !duration) {
        return res.status(400).json({ error: "Missing required fields: spotID, vehicleNumber, or duration" });
    }

    try {
        
        const parkingSpot = await ParkingSpot.findOne({ spotID });

        if (!parkingSpot) {
            return res.status(404).json({ error: "Parking spot not found" });
        }

        if (parkingSpot.status !== "Available") {
            return res.status(400).json({ error: "Parking spot is not available" });
        }
        
        const userId=req.body.userid
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.walletBalance < charge) {
            return res.status(400).json({ error: "Insufficient wallet balance" });
        }

        user.walletBalance -= charge;
        await user.save();
        parkingSpot.status = "Occupied";
        await parkingSpot.save();

        res.status(200).json({ message: "Parking spot updated successfully", parkingSpot });
    } catch (error) {
        console.error("Error updating parking spot:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports={spotDetails,updateSpot}