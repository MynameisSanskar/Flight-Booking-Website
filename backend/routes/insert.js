const mongoose = require('mongoose');
const Bus = require('../models/Buses'); // adjust the path as needed

const cities = [
    "Hyderabad", "Coimbatore", "Vishakapatnam", "Bangalore", "Chennai", "Delhi",
    "Mumbai", "Kolkata", "Trivandram", "Madurai", "Cochin", "Pune", "Dehradun",
    "Jaipur", "Varanasi", "Patna", "Agra", "Kanpur", "Lucknow", "Indore", "Nagpur",
    "Vadodara", "Thane", "Bhopal", "Surat", "Nashik"
];

const companies = ["CompanyA", "CompanyB", "CompanyC"];
const busTypes = ["AC", "Non-AC", "Sleeper"];
const totalSeats = 40;

async function connectDB() {
    await mongoose.connect('mongodb+srv://spwakchaureb22:NayKH5mfRMHXAbiL@cluster0.x2wqd.mongodb.net/flightBookingApp?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
}

function generateBusData() {
    const busData = [];
    const currentDate = new Date();
    
    cities.forEach((startCity) => {
        cities.forEach((destination) => {
            if (startCity !== destination) {
                for (let i = 0; i < 15; i++) {
                    const travelDate = new Date();
                    travelDate.setDate(currentDate.getDate() + i);
                    
                    busData.push({
                        companyName: companies[Math.floor(Math.random() * companies.length)],
                        busType: busTypes[Math.floor(Math.random() * busTypes.length)],
                        busNumber: `BUS${Math.floor(Math.random() * 9000) + 1000}`,
                        startCity: startCity,
                        destination: destination,
                        totalSeats: totalSeats,
                        availableSeats: Math.floor(Math.random() * totalSeats) + 1,
                        pricePerSeat: Math.floor(Math.random() * 401) + 5400, // Price between 400 and 800
                        travelDate: travelDate
                    });
                }
            }
        });
    });
    return busData;
}

async function insertBusData() {
    await connectDB();
    const busData = generateBusData();
    await Bus.insertMany(busData);
    console.log("Bus data inserted for the next 15 days with variable seat prices.");
    mongoose.connection.close();
}

insertBusData();
