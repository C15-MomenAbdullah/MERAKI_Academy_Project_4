const express = require("express")
const router = express.Router()
const authentication = require("../middleware/Authentication");
const authorize = require("../middleware/Authorization");  

const {createBooking,getAllBookings,updateBooking,deleteBooking,getUserBookings} = require("../controllers/bookingController")

router.post("/", authentication, createBooking);
router.get("/", authentication, getAllBookings);
router.put("/:id", authentication, authorize(["admin", "user"]), updateBooking);
router.delete("/:id", authentication, authorize(["admin", "user"]), deleteBooking);
router.get("/mybookings", authentication, getUserBookings);
module.exports = router;