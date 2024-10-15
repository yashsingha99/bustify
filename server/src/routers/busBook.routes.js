const express = require('express');
const router = express.Router();
const {
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
    getAllBookings,
    getUserBooking,
    getAllBusBookData
  } = require('../controllers/busBook.controllers');

// Define routes
router.post('/create', createBooking);
router.get('/get/:id', getBookingById);
router.patch('/update/:id', updateBooking);
router.delete('/delete/:id', deleteBooking);
router.get('/getAllBookings', getAllBookings);
router.get('/getUserBooking', getUserBooking);
router.get('/getAllBusBookData', getAllBusBookData);

module.exports = router;
