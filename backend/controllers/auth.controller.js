const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const exists = await User.findOne({
      email,
    });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,

      email,

      password: hash,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "Success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.json({
      message: "Success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.json({
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function getMe(req,res){
    try{
        const user = req.user;
        res.status(200).json({
            message: "Success",
            user,
        });
    }catch(err){
        res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = {
  register,
  login,
  logout,
  getMe,
};
