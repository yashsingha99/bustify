const User = require("../model/user.model");
const Attendance = require("../model/attendance.model");

const getAttendanceByBusNo = async (req, res) => {
  try {
    const { busNo } = req.query;
    // const cacheKey = `attendance:bus:${busNo}`;

    // redisClient.get(cacheKey, async (err, cachedData) => {
    //   if (err) throw err;

    //   if (cachedData) {
    //     return res.status(200).json(JSON.parse(cachedData));
    //   }

    const attendanceRecords = await Attendance.aggregate([
      { $match: { busNo } },
      {
        $lookup: {
          from: "users",
          localField: "coordinate",
          foreignField: "_id",
          as: "coordinate",
        },
      },
      { $unwind: "$coordinate" },
      {
        $lookup: {
          from: "users",
          localField: "candidate.user",
          foreignField: "_id",
          as: "candidate.user",
        },
      },
    ]);

    // redisClient.setex(cacheKey, 3600, JSON.stringify(attendanceRecords)); 
    res.status(200).json(attendanceRecords);
    // });
  } catch (error) {
    res.status(500).json({ error: "Error fetching attendance" });
  }
};

const createOrUpdateAttendance = async (req, res) => {
  try {
    const { centerId, coordinate, candidates } = req.body;
    
    if (!centerId || !coordinate) {
      return res.status(400).json({ message: "Missing required attendance data" });
    }

    const coordinateUser = await User.findOne({ email: coordinate });
    if (!coordinateUser) {
      return res.status(404).json({ message: "Coordinate user not found" });
    }

    let attendance = await Attendance.findOne({ coordinate: coordinateUser._id });

    if (attendance) {
      let updatedAttendance = await Attendance.findByIdAndUpdate(
        attendance._id,
        {
          $addToSet: { centers: centerId }, // Add the center to the set
          $push: { 
            attendanceRecords: {
              round: "first", // You can dynamically adjust the round here
              candidate: candidates?.map(candidate => ({
                user: candidate.userId, // candidate should include userId
              }))
            }
          }
        },
        { new: true }
      );
      console.log(updatedAttendance);
      
      return res.status(200).json(updatedAttendance);
    } else {
      const newAttendance = await Attendance.create({
        centers: [centerId],
        coordinate: coordinateUser._id,
        attendanceRecords: [{
          round: "first",
          candidate: candidates.map(candidate => ({
            user: candidate.userId,
          }))
        }]
      });
      return res.status(201).json(newAttendance);
    }
  } catch (error) {
    console.error("Error processing attendance", error);
    res.status(500).json({ error: "Error processing attendance" });
  }
};


const fillAttendance = async (req, res) => {
  const { id } = req.params;
  const { attendanceRecords } = req.body;

  try {
    const cacheKey = `attendance:${id}`;

    const attendance = await Attendance.findByIdAndUpdate(
      id,
      { $addToSet: { candidate: attendanceRecords } },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    const updatedAttendance = await attendance.save();
    // redisClient.setex(cacheKey, 3600, JSON.stringify(updatedAttendance)); // Cache the updated attendance for 1 hour

    res.status(200).json(updatedAttendance);
    // });
  } catch (error) {
    res.status(500).json({ error: "Error updating attendance" });
  }
};

const getAttendance = async (req, res) => {
  try {
    let query = {};
    const user  = req.body;
    console.log(req.body);
    
    if (user.role === "coordinate" || user.role === "admin") {
      query.coordinate = user.userId;
    }
    
    const attendanceRecords = await Attendance.find(query)
    .populate("coordinate", "name email role")  
    .populate({
      path: "centers",  
      populate: {
        path: "user",  
        select: "name email _id contact_no",  
      },
    })

    
    res.status(200).json(attendanceRecords);

  } catch (error) {
    res.status(500).json({ error: "Error fetching attendance" });
  }
};


const deleteAttendance = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Permission denied" });
    }

    const { id } = req.params;
    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    // Clear cache for this attendance record
    const cacheKey = `attendance:${id}`;
    // clearCache(cacheKey);

    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting attendance" });
  }
};

module.exports = {
  createOrUpdateAttendance,
  fillAttendance,
  getAttendance,
  deleteAttendance,
  getAttendanceByBusNo,
};