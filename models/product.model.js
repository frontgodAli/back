const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["in-cart", "pending", "delivered"],
    },
    dueDate: {
      type: Date,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestramps: true,
  }
);

const productSchema = mongoose.model("Product", ProductSchema);
module.exports = productSchema;
