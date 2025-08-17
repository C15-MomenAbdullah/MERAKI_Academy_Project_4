const Property = require("../models/property");

const addProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      city,
      type,
      images,
      owner,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !city ||
      !images ||
      images.length === 0 ||
      !owner
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newProperty = new Property({
      title,
      description,
      price,
      city,
      type,
      images,
      owner,
    });

    await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      property: newProperty,
    });
  } catch (err) {
    console.error("Error :", err);
    res.status(500).json({
      success: false,
      message: "Failed to add property",
    });
  }
};

module.exports = { addProperty };