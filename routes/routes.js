const express = require("express");
const {restaurantdetails,registerUser,loginUser,tablebook}=require('../controller/controller')
const cors=require('cors')



const router = express.Router();

router.use(cors({
    credentials:true,
    origin:['http://localhost:3000',"https://restaurant-reservation-frontend-omega.vercel.app/"]
}))


router.post('/signup',registerUser)
router.post('/login',loginUser)

router.get("/restaurantdetails", restaurantdetails);

router.post("/tablebook",tablebook)

module.exports = router;
