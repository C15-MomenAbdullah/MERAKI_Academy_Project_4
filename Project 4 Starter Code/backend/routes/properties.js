const express = require("express");
const router = express.Router();
const authentication = require("../middleware/Authentication");
const authorize = require("../middleware/Authorization");  

const {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

router.post("/", authentication, addProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", authentication, authorize("admin"), updateProperty);
router.delete("/:id", authentication, authorize("admin"), deleteProperty);

module.exports = router;
