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
        message: " all fields reqiured",
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
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to add property",
    });
  }
};


const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("owner", "-password");

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};


const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id).populate("owner", "-password");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};


const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: updated,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update property",
    });
  }
};


const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Property.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete property",
    });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
