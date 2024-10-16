const Center = require("../model/center.model");
// const redisClient = require("../config/redis");

// const clearCentersCache = async () => {
//   const redisHashKey = "centers";
//   await redisClient.del(redisHashKey);
// };

const createCenter = async (req, res) => {
  try {
    const { amount, center, route, reachedAtBus, timing, status } = req.body;

    if (!amount || !center || !reachedAtBus || !timing) {
      return res.status(400).json({
        message: "Amount, center, reachedAtBus, and timing are required.",
      });
    }

    const newCenter = new Center({
      amount,
      center,
      route,
      reachedAtBus,
      timing,
      status,
    });

    const savedCenter = await newCenter.save();

    // await clearCentersCache();

    return res.status(201).json(savedCenter);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create center", error: error.message });
  }
};

const getCenterById = async (req, res) => {
  try {
    const { id } = req.params;

    // const redisKey = `center_${id}`;
    // const cachedCenter = await redisClient.get(redisKey);
    // if (cachedCenter) {
    //   return res.status(200).json(JSON.parse(cachedCenter));
    // }

    const center = await Center.findById(id);

    if (!center) {
      return res.status(404).json({ message: "Center not found." });
    }

    // await redisClient.set(redisKey, JSON.stringify(center), {
    //   EX: 3600,
    // });

    return res.status(200).json(center);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch center", error: error.message });
  }
};

const updateCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: "No fields to update." });
    }

    const updatedCenter = await Center.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCenter) {
      return res.status(404).json({ message: "Center not found." });
    }

    // await clearCentersCache();
    // await redisClient.del(`center_${id}`);

    return res.status(200).json(updatedCenter);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update center", error: error.message });
  }
};

const deleteCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCenter = await Center.findByIdAndDelete(id);

    if (!deletedCenter) {
      return res.status(404).json({ message: "Center not found." });
    }

    // await clearCentersCache();
    // await redisClient.del(`center_${id}`);

    return res.status(200).json({ message: "Center deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete center", error: error.message });
  }
};

const getAllCenters = async (req, res) => {
  try {
    const { status, timing } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (timing) filters.timing = timing;

    const centers = await Center.find(filters)
      .sort({ createdAt: -1 })
      .populate({
        path: "busBook",
        populate: {
          path: "user",
        },
      });

    if (centers.length === 0) {
      return res.status(400).json({ message: "No centers found" });
    }

    return res.status(200).json(centers);
  } catch (error) {
    console.error("Error fetching centers:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch centers", error: error.message });
  }
};

const getCenter = async (req, res) => {
  try {
    const { center, timing, status, amount } = req.body;

    if (!center && !timing && !status && !amount)
      return res.status(400).json({ message: "Insufficient data" });

    // const redisKey = `center_search_${center || "all"}_${timing || "all"}_${
    //   status || "all"
    // }_${amount || "all"}`;

    // const cachedData = await redisClient.get(redisKey);
    // if (cachedData) {
    //   return res.status(200).json(JSON.parse(cachedData));
    // }

    const pipeline = [];

    pipeline.push({
      $match: {
        ...(center ? { center } : {}),
        ...(timing ? { timing } : {}),
        ...(status ? { status } : {}),
        ...(amount ? { amount } : {}),
      },
    });

    const data = await Center.aggregate(pipeline);

    if (!data || data.length === 0)
      return res.status(400).json({ message: "Data not found" });

    // await redisClient.set(redisKey, JSON.stringify(data), {
    //   EX: 3600,
    // });

    return res.status(200).json({ data, message: "Successfully found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  }
};

module.exports = {
  createCenter,
  getCenterById,
  getCenter,
  updateCenter,
  deleteCenter,
  getAllCenters,
};
