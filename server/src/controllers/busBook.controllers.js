const BusBook = require("../model/busBook.model");
const Center = require("../model/center.model");
const User = require("../model/user.model");
// const redisClient = require("../config/redis");

const createBooking = async (req, res) => {
  try {
    const { paymentId, center, id, date, pickup } = req.body;
     
    if (!paymentId)
      return res.status(400).json({ message: "paymentId is required" });

    // const cachedBooking = await redisClient.get(`booking:${paymentId}`);
    // if (cachedBooking) {
    //   return res.status(400).json({ message: "Booking already exists" });
    // }

    const isUser = await User.findById(id);
    if (!isUser) return res.status(400).json({ message: "User not found" });

    const existingBooking = await BusBook.findOne({ paymentId });
    if (existingBooking) {
      return res.status(400).json({ message: "Booking already exists" });
    }

    const newBooking = await BusBook.create({ paymentId, date, center, user: isUser._id, pickup });
    isUser.bookSchema.push(newBooking);
    await isUser.save();
    const findCenter = await Center.findById(center)
    if(!findCenter){
        return res.status(400).json({ message: "Center not found" })
    }
    findCenter.user.push(isUser._id)
    await findCenter.save();

    // await redisClient.set(`booking:${paymentId}`, JSON.stringify(newBooking), "EX", 3600);

    // Invalidate the user's booking list in cache
    // await redisClient.del(`user_bookings:${isUser.email}`);

    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Check cache
    // const cachedBooking = await redisClient.get(`booking:${bookingId}`);
    // if (cachedBooking) {
      // return res.status(200).json(JSON.parse(cachedBooking));
    // }

    // Fetch from DB and populate center and user
    const booking = await BusBook.findById(bookingId).populate("center").populate("user");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Cache the result
    // await redisClient.set(`booking:${bookingId}`, JSON.stringify(booking), "EX", 3600);

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

    // Invalidate cache for this booking
    // await redisClient.del(`booking:${bookingId}`);

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
    if (!deletedBooking) return res.status(404).json({ message: "Booking not found" });

    // await redisClient.del(`booking:${bookingId}`);

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

    // const redisKey = `user_bookings:${isUser.email}`;

    // Check cache
    // const cachedBookings = await redisClient.get(redisKey);
    // if (cachedBookings) {
    //   return res.status(200).json(JSON.parse(cachedBookings));
    // }

    // Fetch from DB
    const bookings = await User.findById(isUser._id).populate({
      path: "bookSchema",
      populate: { path: "center", model: "Center" }
    }).exec();

    if (!bookings || bookings.bookSchema.length === 0)
      return res.status(404).json({ message: "No bookings found" });

    // Cache the result
    // await redisClient.set(redisKey, JSON.stringify(bookings), "EX", 3600);

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // const redisKey = `all_bookings:${page}:${limit}`;
    // const cachedBookings = await redisClient.get(redisKey);

    // if (cachedBookings) {
    //   return res.status(200).json(JSON.parse(cachedBookings));
    // }

    // Fetch paginated bookings from DB
    const bookings = await BusBook.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("center");

    const total = await BusBook.countDocuments();
    const totalPages = Math.ceil(total / limit);

    // Cache the result
    // await redisClient.set(redisKey, JSON.stringify({
    //   total,
    //   totalPages,
    //   currentPage: parseInt(page),
    //   bookings,
    // }), "EX", 3600);

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
    const busBookings = await BusBook.find()
      .populate('center') 
      .populate('user')
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

module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBookings,
  getUserBooking,
  getAllBusBookData
};
