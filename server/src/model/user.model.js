const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    role: {
      type: String,
      enum: ["admin", "student", "coordinate"],
      default: "student",
    },

    contact_no: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    bookSchema: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusBook",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes
userSchema.index({ email: 1 }); // Index on email
userSchema.index({ role: 1 }); // Index on role
userSchema.index({ phoneNumber: 1 }); // Index on phoneNumber

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
