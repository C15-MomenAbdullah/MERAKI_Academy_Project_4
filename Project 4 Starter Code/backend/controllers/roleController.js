const Role = require("../models/role");


const addRole = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Role name is required",
      });
    }

    const existRole = await Role.findOne({ name: name.toLowerCase() });
    if (existRole) {
      return res.status(409).json({
        success: false,
        message: "Role already exists",
      });
    }

    const newRole = new Role({ name: name.toLowerCase() });
    await newRole.save();

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      role: newRole,
    });
  } catch (err) {
    console.error("Add role error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to add role",
    });
  }
};


const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({
      success: true,
      roles,
    });
  } catch (err) {
    console.error("Get roles error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get roles",
    });
  }
};


const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Role name is required",
      });
    }

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name: name.toLowerCase() },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      role: updatedRole,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update role",
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete role",
    });
  }
};

module.exports = { addRole, getRoles, updateRole, deleteRole };