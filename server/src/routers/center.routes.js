const { Router } = require("express");
const router = Router();

const {
  createCenter,
  getCenterById,
  getCenter,
  updateCenter,
  deleteCenter,
  getAllCenters,
} = require("../controllers/center.controller");


router.post("/createCenter", createCenter)
router.get("/getCenterById/:id", getCenterById)
router.get("/getCenter/", getCenter)
router.patch("/updateCenter/:id", updateCenter)
router.delete("/deleteCenter/:id", deleteCenter)
router.get("/getAllCenters", getAllCenters)

module.exports = router