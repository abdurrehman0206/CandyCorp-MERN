const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const addressSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  company: { type: String },
  address1: { type: String, required: true },
  address2: { type: String },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
});
const userSchema = new Schema(
  {
    googleId: { type: String },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    shoppingCart: [
      {
        type: { type: String, enum: ["product", "bundle"], required: true },
        productId: { type: mongoose.Types.ObjectId, ref: "PRODUCT" },
        bundleId: { type: mongoose.Types.ObjectId, ref: "BUNDLE" },
        quantity: { type: Number, default: 1 },
      },
    ],
    addresses: [addressSchema],
  },

  { timestamps: true }
);

userSchema.statics.signup = async function (
  email,
  password,
  fullname,
  username,
  image
) {
  const user = await this.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await this.create({
    email,
    password: hashedPassword,
    fullname,
    username,
    image,
  });
  return newUser;
};
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  return user;
};
userSchema.statics.signupGoogle = async function (
  email,
  fullname,
  username,
  image,
  googleId
) {
  const newUser = await this.create({
    email,
    username,
    fullname,
    image,
    googleId,
  });
  return newUser;
};
module.exports = mongoose.model("USER", userSchema);
