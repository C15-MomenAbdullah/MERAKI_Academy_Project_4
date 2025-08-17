const express = require("express")
const router = express.Router()

const {createBooking,getAllBookings,updateBooking,deleteBooking} = require("../controllers/bookingController")

router.post("/",createBooking)
router.get("/",getAllBookings)
router.put("/:id",updateBooking)
router.delete("/:id",deleteBooking)

module.exports = router;