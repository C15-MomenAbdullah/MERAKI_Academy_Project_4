const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const authentication = require("../middleware/Authentication");
router.post("/favorites", authentication, async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.user.userId;
  try {
    const existing = await Favorite.findOne({ user: userId, property: propertyId });
    if (existing) return res.status(400).json({ success: false, message: "Already favorited" });
    const fav = await new Favorite({ user: userId, property: propertyId }).save();
    res.json({ success: true, favorite: fav });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.delete("/favorites/:propertyId", authentication, async (req, res) => {
  const userId = req.user.userId;
  const propertyId = req.params.propertyId;
  try {
    await Favorite.findOneAndDelete({ user: userId, property: propertyId });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.get("/favorites", authentication, async (req, res) => {
  const userId = req.user.userId;
  try {
    const favs = await Favorite.find({ user: userId }).populate("property");
    res.json({ success: true, favorites: favs });
  } catch {
    
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;
