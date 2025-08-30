const Favorite = require("../models/Favorite");

const createFavorite = async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.user.userId;
  try {
    const existing = await Favorite.findOne({ user: userId, property: propertyId });
    if (existing) return res.status(400).json({ success: false, message: "Already favorited" });
    const favorite = await new Favorite({ user: userId, property: propertyId }).save();
    res.json({ success: true, favorite });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteFavorite = async (req, res) => {
  const userId = req.user.userId;
  const propertyId = req.params.propertyId;
  try {
    await Favorite.findOneAndDelete({ user: userId, property: propertyId });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getFavorites = async (req, res) => {
  const userId = req.user.userId;
  try {
    const favorites = await Favorite.find({ user: userId }).populate("property");
    res.json({ success: true, favorites });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createFavorite, deleteFavorite, getFavorites };
