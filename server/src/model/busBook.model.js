const mongoose = require("mongoose");

const busBookSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      index: true, 
    },
    isRefund:{
      type: Boolean,
      default: false
    },
    bus: {
      type: Number,
    },
    date: {
      type: String,
    },
    pickup: {
      type: String,
    },
    seat: {
      type: Number,
    },
    center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Center",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const BusBook = mongoose.model("BusBook", busBookSchema);

module.exports = BusBook;