const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    busNo: {
      type: String,
    },

    coordinate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    centers:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center",
      }
    ],

    attendanceRecords: [
      {
        round: {
          type: String,
          enum: ["first", "second"],
          default: "first"
        },

        seats: [
          {
            busBook: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "BusBook",
            },
            status: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
      
    ],

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ busNo: 1 });
attendanceSchema.index({ coordinate: 1 });
attendanceSchema.index({ date: -1 });
attendanceSchema.index({ attendanceType: 1 });
attendanceSchema.index({ "candidate.user": 1 });

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
