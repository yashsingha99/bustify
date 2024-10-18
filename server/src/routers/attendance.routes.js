const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const authorizeRoles  = require('../middleware/authorizeRoles');
const { verifyToken } = require('../middleware/verifyToken'); 

router.post(
  '/',
  // verifyToken,
  // authorizeRoles('admin'), 
  attendanceController.createOrUpdateAttendance
);

router.put(
  '/:id',
  // verifyToken,
  // authorizeRoles('admin', 'coordinate'), 
  attendanceController.fillAttendance
);

router.post(
  '/getAttendance',
  // verifyToken,
  // authorizeRoles('admin', 'coordinate'), 
  attendanceController.getAttendance
);

router.delete(
  '/:id',
  // verifyToken,
  authorizeRoles('admin'), 
  attendanceController.deleteAttendance
);

router.get(
  'bus/:id',
  // verifyToken,
  authorizeRoles('admin'), 
  attendanceController.getAttendanceByBusNo
);

module.exports = router;
