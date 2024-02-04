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

router.route("/getUsers").get(verifyToken, getUser);
router.route("/addUsers").post(addUser);
router.route("/updateUsers/:id").put(updateUser);
router.route("/getuser/:id").get(verifyToken, getUserbyId);
router.route("/loginUser").post(loginUser);

module.exports = router;
