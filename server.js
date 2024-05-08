const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const router=require('./routes/routes')
const dotenv=require('dotenv')
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());

mongoose.connect("mongodb://localhost:27017/restarunt_reservation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

app.use('/',router);



app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
