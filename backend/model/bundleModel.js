const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bundleSchema = new Schema(
  {
    name: { type: String, required: true },
    inStock: { type: Boolean },
    description: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    category: { type: String },
    type: { type: String },
    flavor: { type: String },
    size: { type: String },
    images: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "PRODUCT" },
        quantity: { type: Number, default: 1 },
      },
    ],
    onSale: { type: Boolean, default: false },
    salePercentage: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BUNDLE", bundleSchema);
