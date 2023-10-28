const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "PRODUCT" }],
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing", 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ORDER", orderSchema);
