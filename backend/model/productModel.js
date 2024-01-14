const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    category: { type: String },
    type: { type: String },
    flavor: { type: String },
    size: { type: String },
    inStock: { type: Boolean },
    onSale: { type: Boolean, default: false },
    salePercentage: { type: Number, default: 0, min: 0, max: 100 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
    images: [{ type: String }],
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
        title: { type: String },
        rating: { type: Number, default: 5, min: 0, max: 5 },
        comment: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PRODUCT", productSchema);
