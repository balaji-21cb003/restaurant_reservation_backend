const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');
const router=require('./routes/routes')
const dotenv=require('dotenv')
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/restarunt_reservation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

//routes
app.use('/',router);

// Define a route to handle GET requests for restaurant details
// app.get("/restaurantdetails", async (req, res) => {
//   try {
//     // Use Mongoose to find all restaurant details from the database
//     const restaurants = await Restaurant.find();
//     res.json(restaurants); // Send the restaurant details as JSON response
//   } catch (error) {
//     console.error("Error fetching restaurant details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Start the Express server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
