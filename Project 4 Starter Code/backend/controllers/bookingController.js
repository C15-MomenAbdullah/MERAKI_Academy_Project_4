const Booking = require("../models/booking");

const createBooking = async (req, res) => {
  try {
    const { property, user, startDate, endDate, totalPrice } = req.body;

    if (!property || !user || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: "please fill all fields",
      });
    }

    const newBooking = new Booking({
      property,
      user,
      startDate,
      endDate,
      totalPrice,
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "booking created",
      booking: newBooking,
    });
  } catch (err) {
    console.error("failed to create booking", err);
    res.status(500).json({
      success: false,
      message: "failed to create booking",
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("property")
      .populate("user");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (err) {
    console.error("failed", err);
    res.status(500).json({
      success: false,
      message: "failed",
    });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (err) {
    console.error("failed to get user bookings", err);
    res.status(500).json({
      success: false,
      message: "failed to fetch bookings",
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updateData = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking: updatedBooking,
    });
  } catch (err) {
    console.error("failed", err);
    res.status(500).json({
      success: false,
      message: "update failed",
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "booking deleted",
    });
  } catch (err) {
    console.error("failed to delete", err);
    res.status(500).json({
      success: false,
      message: "delete failed",
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getUserBookings, 
  updateBooking,
  deleteBooking,
};
