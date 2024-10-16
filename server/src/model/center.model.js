const mongoose = require("mongoose");

const centerSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    center: {
      type: String,
      required: true,
    },
    route: {
      type: [String],
    },
    reachedAtBus: {
      type: Date,
      required: true,
    },
    timing: {
      type: String,
      enum: ["Forenoon", "Afternoon"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "unactive", "under maintenance"],
      default: "active",
    },
    busBook:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusBook",
      }
    ]
  },
  { timestamps: true }
);

centerSchema.index({ amount: 1 }); 
centerSchema.index({ center: 1 }); 
centerSchema.index({ timing: 1 }); 
centerSchema.index({ status: 1 }); 
centerSchema.index({ reachedAtBus: 1 }); 
centerSchema.index({ amount: 1, center: 1, timing: 1, status: 1 });

const Center = mongoose.model("Center", centerSchema);

module.exports = Center;
