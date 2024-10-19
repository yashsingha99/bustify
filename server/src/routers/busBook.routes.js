const express = require('express');
const router = express.Router();
const {
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
    getAllBookings,
    getUserBooking,
    getAllBusBookData,
    changeRefund,
    createBusBookByAdmin
  } = require('../controllers/busBook.controllers');

router.post('/create', createBooking);
router.get('/get/:id', getBookingById);
router.patch('/update/:id', updateBooking);
router.delete('/delete/:id', deleteBooking);
router.get('/getAllBookings', getAllBookings);
router.get('/getUserBooking', getUserBooking);
router.get('/getAllBusBookData', getAllBusBookData);
router.post('/changeRefund', changeRefund);
router.post('/createbusBookByadmin', createBusBookByAdmin);

module.exports = router;
