const BusBook = require("../model/busBook.model");
const Center = require("../model/center.model");
const User = require("../model/user.model");

const createBooking = async (req, res) => {
  try {
    const { paymentId, center, id, date, pickup } = req.body;

    if (!paymentId)
      return res.status(400).json({ message: "paymentId is required" });
    const isUser = await User.findById(id);
    if (!isUser) return res.status(400).json({ message: "User not found" });

    const existingBooking = await BusBook.findOne({ paymentId });
    if (existingBooking) {
      return res.status(400).json({ message: "Booking already exists" });
    }

    const newBooking = await BusBook.create({
      paymentId,
      date,
      center,
      user: isUser._id,
      pickup,
    });
    isUser.bookSchema.push(newBooking);
    await isUser.save();
    const findCenter = await Center.findById(center);
    if (!findCenter) {
      return res.status(400).json({ message: "Center not found" });
    }
    findCenter.busBook.push(newBooking);
    await findCenter.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await BusBook.findById(bookingId)
      .populate("center")
      .populate("user");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updates = req.body;

    // Update booking in DB
    const updatedBooking = await BusBook.findByIdAndUpdate(bookingId, updates, {
      new: true,
    }).populate("center");

    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await BusBook.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const deleteFromUser = await User.findByIdAndUpdate(deletedBooking.user, {
      $pull: { bookSchema: deletedBooking._id },
    });
    if (!deleteFromUser) {
      return res
        .status(404)
        .json({ message: "Booking not found in user records" });
    }
    const deleteFromCenter = await Center.findByIdAndUpdate(
      deletedBooking.center,
      {
        $pull: { busBook: deletedBooking._id },
      }
    );
    if (!deleteFromCenter) {
      return res
        .status(404)
        .json({ message: "Booking not found in center records" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserBooking = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email)
      return res.status(400).json({ message: "Email must be provided" });

    // Check user
    const isUser = await User.findOne({ email });
    if (!isUser) return res.status(404).json({ message: "User not found" });
    const bookings = await User.findById(isUser._id)
      .populate({
        path: "bookSchema",
        populate: { path: "center", model: "Center" },
      })
      .exec();

    if (!bookings || bookings.bookSchema.length === 0)
      return res.status(404).json({ message: "No bookings found" });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const bookings = await BusBook.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("center");

    const total = await BusBook.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      total,
      totalPages,
      currentPage: parseInt(page),
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllBusBookData = async (req, res) => {
  try {
    // await BusBook.updateMany({}, { $set: { isRefund: false } })

    const busBookings = await BusBook.find()
      .populate("center", "amount center timing")
      .populate("user", "email name contact_no")
      .exec();

    res.status(200).json({
      success: true,
      data: busBookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving bus booking data",
      error: error.message,
    });
  }
};

const changeRefund = async (req, res) => {
  try {
    const { paymentId } = req.body;
    console.log(req.body);

    // Find the bus booking by paymentId
    const findBusBook = await BusBook.findOne({ paymentId });

    // If no matching bus book is found
    if (!findBusBook) {
      return res.status(400).json({ message: "Payment doesn't exist" });
    }

    // Toggle the isRefund field
    findBusBook.isRefund = !findBusBook.isRefund;

    // Save the updated bus book document
    await findBusBook.save();

    // Send success response
    return res.status(200).json({
      message: "Refund status updated successfully",
      isRefund: findBusBook.isRefund,
    });
  } catch (error) {
    console.error("Error updating refund status:", error);
    // Handle internal server error
    return res.status(500).json({ message: "Internal Issue" });
  }
};

const createBusBookByAdmin = async (req, res) => {
  try {
    const { email, contact_no, center, date, paymentId, pickup } = req.body;
    
    const user = await User.findOne({
      $or: [{ contact_no }, { email }],
    });
    
    if (!user) {
      return res.status(400).json({ message: "User not found with these credentials" });
    }
    
    // Find the center by ID
    const isCenter = await Center.findById(center); 
    if (!isCenter) {
      return res.status(400).json({ message: "Center not found" });
    }
    
    const newBusBook = await BusBook.create({
      pickup,
      center: isCenter._id,
      user: user._id,
      paymentId,
      date,
    });
    
    if (!newBusBook) {
      return res.status(400).json({ message: "Error creating new trip" });
    }
    
    const addUser = await User.findByIdAndUpdate(user._id, {
      $addToSet: { bookSchema: newBusBook._id },
    });
    
    if (!addUser) {
      return res.status(400).json({ message: "Error adding new bus booking to user" });
    }

    const addCenter = await Center.findByIdAndUpdate(isCenter._id, {
      $addToSet: { busBook: newBusBook._id },
    });
    
    if (!addCenter) {
      return res.status(400).json({ message: "Error adding new bus booking to center" });
    }
    
    return res.status(200).json({ message: "Your trip has been successfully created" });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "Internal server issue" });
  }
};


module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBookings,
  getUserBooking,
  getAllBusBookData,
  changeRefund,
  createBusBookByAdmin,
};
