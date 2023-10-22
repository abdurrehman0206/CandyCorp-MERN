const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image:{ type : String, required: true},
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean },
    reviews : [ { type: String}]
    

  },
  { timestamps: true }
);

module.exports = mongoose.model("PRODUCT", productSchema);
