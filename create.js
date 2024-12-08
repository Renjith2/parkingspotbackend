// createParkingSpots.js

const mongoose = require('mongoose');
const parkpsotSchema = require('./Schema/parkpsotSchema');
// MongoDB URI (Ensure this is in your .env file or securely stored)
const uri = "mongodb+srv://renjithkrishnan316:renjith1990@cluster0.xti7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Function to create parking spots
const createParkingSpotsCollection = async () => {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB!");

        // Generate parking spot data
        const parkingSpots = [];

        // Add spots 1-8 for cars
        for (let i = 1; i <= 8; i++) {
            parkingSpots.push(new parkpsotSchema({
                spotID: i.toString(),
                vehicleType: "Car",
                status: "Available", // Default status
                charge: "10",        // Default charge for cars
            }));
        }

        // Add spots 9-16 for bikes
        for (let i = 9; i <= 16; i++) {
            parkingSpots.push(new parkpsotSchema({
                spotID: i.toString(),
                vehicleType: "Bike",
                status: "Available", // Default status
                charge: "5",         // Default charge for bikes
            }));
        }

        // Insert the generated data into the database using Mongoose
        const result = await parkpsotSchema.insertMany(parkingSpots);
        console.log(`Inserted ${result.length} parking spots into the collection.`);

    } catch (error) {
        console.error("Error creating collection or inserting data:", error);
    } finally {
        // Close the connection
        mongoose.connection.close();
        console.log("Connection to MongoDB closed.");
    }
};

// Run the script
createParkingSpotsCollection();

