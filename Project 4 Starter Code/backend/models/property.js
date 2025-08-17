const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["apartment", "villa", "Chalet", "other"],
      default: "apartment",
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    images: [{
      type:String,required:true, 
      
    }],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);