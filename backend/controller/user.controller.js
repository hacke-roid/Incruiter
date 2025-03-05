const User = require("../model/user.model.js");
var jwt = require("jsonwebtoken");

const UserRegister = async (req, res, next) => {
  try {
    console.log("Hello");
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });
    return res
      .status(200)
      .json({ error: false, message: "User Created Successfully", newUser });
  } catch (err) {
    next(err);
  }
};

const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Account Doesnt exist" });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ error: true, message: "Incorrect Password" });
    }

    //! JWT token creation

    let token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "10s",
    });
    return res
      .status(200)
      .json({
        error: false,
        message: "Login Successfully",
        token,
        user: user._id,
      });
  } catch (err) {
    next(err);
  }
};

const GetUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    return res
      .status(200)
      .json({ error: false, message: "User details successfully", user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  UserRegister,
  UserLogin,
  GetUserDetails,
};
