const USER = require("../model/userModel");
const PRODUCT = require("../model/productModel");
const BUNDLE = require("../model/bundleModel");
const JWT = require("jsonwebtoken");
const { userInfo } = require("os");
const validator = require("validator");

const generateToken = (email, id) => {
  const token = JWT.sign({ email, id }, process.env.SECRET, {
    expiresIn: "365d",
  });
  return token;
};
const googleLogin = async (req, res) => {
  const { googleId, email, fullname, username, image } = req.body;

  try {
    let user = await USER.findOne({ googleId });

    if (!user) {
      user = await USER.signupGoogle(
        email,
        fullname,
        username,
        image,
        googleId
      );
    }

    const token = generateToken(user.email, user._id);
    const userPayload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      image: user.image,
      shoppingCart: user.shoppingCart,
      addresses: user.addresses,
      token,
    };
    console.log("🚀 ~ googleLogin ~ userPayload:", userPayload);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userPayload,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const signup = async (req, res) => {
  const { email, password, fullname, username, image } = req.body;
  const emptyInputs = [];
  if (!email) {
    emptyInputs.push("email");
  }
  if (!password) {
    emptyInputs.push("password");
  }
  if (!fullname) {
    emptyInputs.push("fullname");
  }
  if (!username) {
    emptyInputs.push("username");
  }
  if (emptyInputs.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Empty inputs",
      error: "Please fill in all the required fields",
      emptyInputs,
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
      error: "Please enter a valid email",
    });
  }
  try {
    const user = await USER.signup(email, password, fullname, username, image);
    const token = generateToken(user.email, user._id);
    const userPayload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      image: user.image,
      shoppingCart: user.shoppingCart,
      addresses: user.addresses,
      token,
    };
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userPayload,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const emptyInputs = [];
  if (!email) {
    emptyInputs.push("email");
  }
  if (!password) {
    emptyInputs.push("password");
  }

  if (emptyInputs.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Empty inputs",
      error: "Please fill in all the required fields",
      emptyInputs,
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
      error: "Please enter a valid email",
    });
  }
  try {
    const user = await USER.login(email, password);
    const token = generateToken(user.email, user._id);
    const userPayload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      image: user.image,
      shoppingCart: user.shoppingCart,
      addresses: user.addresses,
      token,
    };
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userPayload,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const addAddress = async (req, res) => {
  const {
    firstname,
    lastname,
    company,
    address1,
    address2,
    country,
    postalCode,
    phone,
  } = req.body;
  const userId = req.user.id;

  try {
    const user = await USER.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User does not exist",
      });
    }

    const newAddress = {
      firstname,
      lastname,
      company,
      address1,
      address2,
      country,
      postalCode,
      phone,
    };

    user.addresses.push(newAddress);

    const updatedUser = await user.save();

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: updatedUser.addresses[updatedUser.addresses.length - 1],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateAddress = async (req, res) => {
  const { addressId } = req.params;
  const {
    firstname,
    lastname,
    company,
    address1,
    address2,
    country,
    postalCode,
    phone,
  } = req.body;
  const userId = req.user.id;

  try {
    const user = await USER.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User does not exist",
      });
    }

    const addressIndex = user.addresses.findIndex(
      (address) => address._id == addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
        error: "Address does not exist",
      });
    }

    user.addresses[addressIndex] = {
      firstname,
      lastname,
      company,
      address1,
      address2,
      country,
      postalCode,
      phone,
      _id: addressId,
    };

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedUser.addresses[addressIndex],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const verifyToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: "Please provide a valid token",
    });
  }
  try {
    const { id, email } = JWT.verify(token, process.env.SECRET);
    const user = await USER.findById({ _id: id, email });

    const userPayload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      image: user.image,
      shoppingCart: user.shoppingCart,
      addresses: user.addresses,
      token,
    };
    return res.status(200).json({
      success: true,
      message: "Token verified successfully",
      user: userPayload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const deleteAddress = async (req, res) => {
  const { addressId } = req.params;
  const userId = req.user.id;

  try {
    const user = await USER.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User does not exist",
      });
    }

    const addressIndex = user.addresses.findIndex(
      (address) => address._id == addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
        error: "Address does not exist",
      });
    }

    user.addresses.splice(addressIndex, 1);

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: updatedUser.addresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user.id;

  try {
    const user = await USER.findById(userId);

    const cartItemIndex = user.shoppingCart.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in the cart",
        error: "Cart item with the provided ID not found",
      });
    }

    user.shoppingCart.splice(cartItemIndex, 1);

    await user.save();

    const updatedUser = await USER.findById(userId).populate({
      path: "shoppingCart.productId bundleId",
      select: "_id name price quantity inStock onSale salePercentage images",
    });

    res.status(200).json({
      success: true,
      message: "Item removed from the cart successfully",
      data: updatedUser.shoppingCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Error",
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await USER.findById(userId).populate({
      path: "shoppingCart.productId shoppingCart.bundleId",
      select: "_id name price quantity inStock onSale salePercentage images",
    });
    // user.populate({
    //   path: "shoppingCart.bundleId",
    //   select: "_id name price quantity inStock onSale salePercentage images",
    // });

    res.status(200).json({
      success: true,
      message: "Shopping cart fetched successfully",
      data: user.shoppingCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Error",
      error: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const user = await USER.findById(userId);

    let existingCartItem;
    let itemType;

    const isProduct = await PRODUCT.exists({ _id: itemId });
    const isBundle = await BUNDLE.exists({ _id: itemId });

    if (isProduct) {
      existingCartItem = user.shoppingCart.find(
        (item) =>
          item.type === "product" && item.productId.toString() === itemId
      );
      itemType = "product";
    } else if (isBundle) {
      existingCartItem = user.shoppingCart.find(
        (item) => item.type === "bundle" && item.bundleId.toString() === itemId
      );
      itemType = "bundle";
    } else {
      return res.status(404).json({
        success: false,
        message: "Item not found",
        error:
          "Item with the provided ID not found in PRODUCT or BUNDLE collection",
      });
    }

    // Get product/bundle information
    let item;
    if (itemType === "product") {
      item = await PRODUCT.findById(itemId);
    } else {
      item = await BUNDLE.findById(itemId);
    }

    if (item.quantity < quantity) {
      return res.status(404).json({
        success: false,
        message: "Not enough stock",
        error: "Requested quantity exceeds available stock",
      });
    }

    if (existingCartItem) {
      existingCartItem.quantity += quantity || 1;
    } else {
      user.shoppingCart.push({
        type: itemType,
        [`${itemType}Id`]: itemId,
        quantity: quantity || 1,
      });
    }

    await user.save();

    const updatedUser = await USER.findById(userId).populate({
      path: `shoppingCart.${itemType}Id`,
      select: "_id name price quantity inStock onSale salePercentage images",
    });

    res.status(200).json({
      success: true,
      message: "Item added to the cart successfully",
      data: updatedUser.shoppingCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Error",
      error: error.message,
    });
  }
};
const updateCartItem = async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const user = await USER.findById(userId);

    const cartItem = user.shoppingCart.find(
      (item) => item._id.toString() === itemId
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in the cart",
        error: "Cart item with the provided ID not found",
      });
    }

    let itemType;
    let item;

    if (cartItem.type === "product") {
      itemType = "product";
      item = await PRODUCT.findById(cartItem.productId);
    } else if (cartItem.type === "bundle") {
      itemType = "bundle";
      item = await BUNDLE.findById(cartItem.bundleId);
    } else {
      return res.status(404).json({
        success: false,
        message: "Invalid cart item type",
        error: "Cart item has an invalid type",
      });
    }

    if (item.quantity < quantity) {
      return res.status(404).json({
        success: false,
        message: "Not enough stock",
        error: "Requested quantity exceeds available stock",
      });
    }

    cartItem.quantity = quantity || 1;

    await user.save();

    const updatedUser = await USER.findById(userId).populate({
      path: `shoppingCart.${itemType}Id`,
      select: "_id name price quantity inStock onSale salePercentage images",
    });

    res.status(200).json({
      success: true,
      message: "Shopping cart item updated successfully",
      data: updatedUser.shoppingCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Error",
      error: error.message,
    });
  }
};

// const addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user.id;

//   try {
//     const user = await USER.findById(userId);
//     const product = await PRODUCT.findById(productId);
//     const existingCartItem = user.shoppingCart.find(
//       (item) => item.productId.toString() === productId
//     );

//     if (existingCartItem) {
//       if (
//         existingCartItem.quantity >= product.quantity &&
//         existingCartItem.quantity + quantity > product.quantity
//       ) {
//         return res.status(404).json({
//           success: false,
//           message: "Not enough stock",
//         });
//       } else {
//         existingCartItem.quantity += quantity || 1;
//       }
//     } else {
//       if (product.quantity < quantity) {
//         return res.status(404).json({
//           success: false,
//           message: "Not enough stock",
//         });
//       } else {
//         user.shoppingCart.push({ productId, quantity: quantity || 1 });
//       }
//     }

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Product added to the cart successfully",
//       data: user.shoppingCart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Error",
//       error: error.message,
//     });
//   }
// };
// const addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user.id;

//   try {
//     const user = await USER.findById(userId);
//     const product = await PRODUCT.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     const existingCartItem = user.shoppingCart.find(
//       (item) => item.productId.toString() === productId
//     );

//     if (existingCartItem) {
//       if (existingCartItem.quantity + (quantity || 1) > product.quantity) {
//         return res.status(404).json({
//           success: false,
//           message: "Not enough stock",
//         });
//       } else {
//         existingCartItem.quantity += quantity || 1;
//       }
//     } else {
//       if (product.quantity < (quantity || 1)) {
//         return res.status(404).json({
//           success: false,
//           message: "Not enough stock",
//         });
//       } else {
//         user.shoppingCart.push({ productId, quantity: quantity || 1 });
//       }
//     }

//     await user.save();

//     const updatedUser = await USER.findById(userId).populate({
//       path: "shoppingCart.productId",
//       select: "_id name price quantity inStock onSale salePercentage images",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Product added to the cart successfully",
//       data: updatedUser.shoppingCart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Error",
//       error: error.message,
//     });
//   }
// };

// const getCart = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const user = await USER.findById(userId).populate({
//       path: "shoppingCart.productId",
//       select: "_id name price quantity inStock onSale salePercentage images",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Shopping cart fetched successfully",
//       data: user.shoppingCart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Error",
//       error: error.message,
//     });
//   }
// };

// const updateCartItem = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user.id;

//   try {
//     const user = await USER.findById(userId);

//     const existingCartItem = user.shoppingCart.find(
//       (item) => item.productId.toString() === productId
//     );

//     if (existingCartItem) {
//       if (
//         existingCartItem.quantity >= product.quantity &&
//         existingCartItem.quantity + quantity > product.quantity
//       ) {
//         return res.status(404).json({
//           success: false,
//           message: "Not enough stock",
//         });
//       } else {
//         existingCartItem.quantity += quantity || 1;
//       }
//     }

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Shopping cart item updated successfully",
//       data: user.shoppingCart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Error",
//       error: error.message,
//     });
//   }
// };

// const updateCartItem = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user.id;

//   try {
//     const user = await USER.findById(userId);
//     const product = await PRODUCT.findById(productId);

//     const existingCartItem = user.shoppingCart.find(
//       (item) => item.productId.toString() === productId
//     );

//     if (existingCartItem) {
//       if (existingCartItem.quantity + (quantity || 1) > product.quantity) {
//         return res.status(404).json({
//           success: false,
//           message: "Not enough stock",
//         });
//       } else {
//         existingCartItem.quantity = quantity || 1;
//       }
//     }

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Shopping cart item updated successfully",
//       data: user.shoppingCart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Error",
//       error: error.message,
//     });
//   }
// };

// const removeFromCart = async (req, res) => {
//   const { productId } = req.params;
//   const userId = req.user.id;

//   try {
//     const user = await USER.findById(userId);

//     user.shoppingCart = user.shoppingCart.filter(
//       (item) => item.productId.toString() !== productId
//     );

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Product removed from the cart successfully",
//       data: user.shoppingCart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Error",
//       error: error.message,
//     });
//   }
// };

module.exports = {
  signup,
  login,
  addAddress,
  updateAddress,
  deleteAddress,
  verifyToken,
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  googleLogin,
};
