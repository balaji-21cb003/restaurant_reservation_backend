const Restaurant = require("../model/restaruntschema");
const User = require("../model/userschema");
const Reservation = require("../model/reservationschema");
const { hashPassword, comparePassword } = require("../helpers/helper");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const restaurantdetails = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants); 
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }

    if (!email) {
      return res.json({
        error: "Enter email",
      });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }


    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({
        error: "Email is taken already",
      });
    }

    const hashedPassword = await hashPassword(password);
    // console.log(hashPassword)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body)
    const user = await User.findOne({ email });
    if (!user) {
      // console.log(user);
      return res.json({
        error: "User does not exist",
      });
    }
    // console.log("tyghj")
    const match = await comparePassword(password, user.password);

    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          // console.log('token : ',token);
          res.cookie("token", token).json(user);
        }
      );
      // console.log('match')
      // return res.json('password matched')
    }
    if (!match) {
      res.json({
        error: "Password doesn't match",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "doctocare7@gmail.com",
    pass: "txgqylxonjcdzjjo",
  },
});

async function sendEmail(name, email, phoneNumber, reservationDetails) {
  try {
    const { Name, City, Cost, Location } = reservationDetails.restaurantDetails;
    const { date, occasion, table, time } = reservationDetails.reservationDetails;

    const selectedDate = new Date(date);
    const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    
    const mailOptions = {
      from: "doctocare7@gmail.com",
      to: email,
      subject: "Reservation Confirmation",
      text: `Dear ${name},

      Thank you for making a reservation with us.

      Your reservation details:

      Name: ${name}
      Phone Number: ${phoneNumber}

      Restaurant Details:
      Name: ${Name}
      City: ${City}
      Cost: ${Cost}
      Location: ${Location}

      Reservation Details:
      Date: ${formattedDate}
      Time: ${time}
      Occasion: ${occasion}
      Table: ${table}

      We look forward to welcoming you!

      Best regards,
      The Restaurant Team`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error to handle it in the caller function
  }
}



const tablebook = async (req, res) => {
  try {
    const formData = req.body;
    // console.log("FormData from frontend:", formData);

    const restaurantDetails = await Restaurant.findOne({ city: formData.city });
    console.log("Restaurant details:", restaurantDetails);

    const selectedDate = new Date(formData.date);
    const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = formData.time;


    const reservation = new Reservation({
      restaurantDetails: {
        city: restaurantDetails.City,
        cost: restaurantDetails.Cost,
        location: restaurantDetails.Location,
      },
      reservationDetails: {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        occasion: formData.occasion,
        specialRequest: formData.specialRequest,
        userConfirmation: formData.userConfirmation,
        optIn: formData.optIn,
        covidSafetyAgreement: formData.covidSafetyAgreement,
        selectedDate: formattedDate,
        selectedTime: formData.time,
      },
    });
    // console.log("Reservation document:", reservation);
    // console.log(formData.time);

    await reservation.save();

    await sendEmail(
      formData.name,
      formData.email,
      formData.phoneNumber,
      { restaurantDetails, reservationDetails: formData }
    );

    res.sendStatus(200); 
  } catch (error) {
    console.error("Error processing reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};






module.exports = {
  restaurantdetails,
  loginUser,
  registerUser,
  tablebook,
};
