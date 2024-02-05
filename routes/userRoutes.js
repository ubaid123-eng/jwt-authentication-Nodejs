const express = require("express");
const router = express.Router();

const {
  getUser,
  addUser,
  updateUser,
  getUserbyId,
  loginUser,
} = require("../controllers/User");
const { verifyToken } = require("../middleware/auth");



router.get("/getUsers", verifyToken, getUser);
router.post("/addUsers", addUser);
router.put("/updateUsers/:id", updateUser);
router.get("/getuser/:id", verifyToken, getUserbyId);
router.post("/loginUser", loginUser);

module.exports = router;
