const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    inStock: { type: Boolean },
    images: [{ type: String }],
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
        rating: Number,
        comment: String,
      },
    ],
  },
  { timestamps: true },
  
);

module.exports = mongoose.model("PRODUCT", productSchema);
