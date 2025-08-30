const express = require("express");
const router = express.Router();
const auth = require("../middleware/Authentication");
const Favorite = require("../models/Favorite");
const Property = require("../models/property");

router.post("/toggle/:propertyId", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const propertyId = req.params.propertyId;

    const existingFavorite = await Favorite.findOne({ user: userId, property: propertyId });

    if (existingFavorite) {
      await existingFavorite.deleteOne();
      return res.json({ success: true, message: "Removed from favorites" });
    }

    const newFavorite = new Favorite({ user: userId, property: propertyId });
    await newFavorite.save();

    res.json({ success: true, message: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const favorites = await Favorite.find({ user: userId }).populate("property");
    res.json({ success: true, favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
