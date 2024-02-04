const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const userhelpers = require("../Helpers/UserHelper");
const genToken = require("../middleware/generateToken");

// add user to the db
const addUser = async (req, res) => {
  try {
    const body = req.body;
    const requiredFields = [
      "email",
      "MobileNum",
      "first_name",
      "last_name",
      "gender",
      "password",
    ];

    // Check if all required fields are present
    const missingField = requiredFields.find((field) => !body[field]);

    if (missingField) {
      return res.status(400).json({
        message: `${missingField} is required`,
      });
    }

    if (!userhelpers.checkMobileLength(body.MobileNum)) {
      return res.status(409).json({
        message: "Number length must be exactly 11!",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: body.email }, { MobileNum: body.MobileNum }],
    });
    if (existingUser) {
      return res.status(409).json({
        message: "User number or email already exists!",
      });
    }

    const user = new User({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      MobileNum: body.MobileNum,
      gender: body.gender,
    });

    await user.save();

    return res.status(201).json({
      message: "User created successfully!",
      userdata: [
        {
          Id: user._id,
          Email: user.email,
          Numbe: user.MobileNum,
          Token: genToken.generateToken(user._id),
        },
      ],
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const requiredFields = ["email", "password"];

    const missingField = requiredFields.find((fields) => !req.body[fields]);

    if (missingField) {
      return res.status(400).json({
        message: `${missingField} is required`,
      });
    }

    const users = await User.findOne({ email });

    if (!users) {
      return res.status(404).json({
        message: "User not found!!!!",
      });
    }

    const compare = await userhelpers.comparepass(password, users.password);

    if (!compare) {
      return res.status(404).json({
        message: "password does not match !!!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "user login successfully!!!",
      userdata: [
        {
          email: users.email,
          Number: users.MobileNum,
          token: genToken.generateToken(users._id),
        },
      ],
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// update user by id
const updateUser = async (req, res) => {
  try {
    const reqid = req.params.id;
    const body = req.body;

    const user = await User.findById(reqid);
    if (!user) {
      return res.status(404).json({
        message: "User not found!!!!",
      });
    } else {
      user.first_name = body.first_name || user.first_name;
      user.last_name = body.last_name || user.last_name;
      user.email = body.email || user.email;

      if (body.password) {
        user.password = await bcrypt.hash(body.password, 10);
      }

      // Check mobile number length before updating
      if (!userhelpers.checkMobileLength(body.MobileNum)) {
        return res.status(409).json({
          message: "Number length must be exactly 11!",
        });
      }
      user.MobileNum = body.MobileNum || user.MobileNum;
      user.gender = body.gender || user.gender;

      await user.save();
      return res.status(201).json({
        message: "User updated successfully!!!!",
      });
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get all users
const getUser = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      message: "users fetches successfully!!!",
      users: users,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get individual user by id
const getUserbyId = async (req, res) => {
  try {
    const reqid = req.params.id;
    const users = await User.findById(reqid);

    if (!users) {
      return res.status(404).json({
        message: "User not found!!!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "users fetches successfully!!!",
      users: users,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  getUserbyId,
  loginUser,
};
