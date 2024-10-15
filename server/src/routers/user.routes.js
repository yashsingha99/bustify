const { Router } = require("express");
const router = Router();

const {
  createUser,
  login,
  getAllUsers,
  getUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controllers");

router.post("/create", createUser);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/getUser", getUser);
router.get("/getUserById/:id", getUserById);
router.patch("/updateUserById/:id", updateUserById);
router.delete("/deleteUserById/:id", deleteUserById);

module.exports = router;
