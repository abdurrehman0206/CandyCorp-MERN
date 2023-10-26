const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    inStock: Boolean,
    images: [{ type: String }], // Array of image URLs
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "USER" }, // Reference to User model
        rating: Number,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PRODUCT", productSchema);
