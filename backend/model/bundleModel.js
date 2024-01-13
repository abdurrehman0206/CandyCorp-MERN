const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bundleSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "PRODUCT" },
        quantity: { type: Number, default: 1 },
      },
    ],
    price: { type: Number, required: true },
    onSale: { type: Boolean, default: false },
    salePercentage: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BUNDLE", bundleSchema);
