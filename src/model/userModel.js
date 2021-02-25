import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
  tokenExpired: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

//membuat fungsi instances dari userSchema dengan menggunakan methods
userSchema.methods.addCart = function (product) {
  const index = this.cart.items.findIndex(
    (item) => item.productId.toString() === product._id.toString()
  );

  if (index >= 0) this.cart.items[index].quantity += 1;
  else this.cart.items.push({ productId: product._id, quantity: 1 });

  return this.save();
};

userSchema.methods.removeCart = function (id) {
  const updateProduct = this.cart.items.filter(
    (item) => item.productId.toString() !== id.toString()
  );
  this.cart.items = updateProduct;

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
