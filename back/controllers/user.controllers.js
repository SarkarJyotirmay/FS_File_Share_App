import { UserModel } from "../models/user.model.js";

const register = async (req, res) => {
  // validation of payload
  // create a user doc in db
  // send the user detail to response
  // payload => {name, email, pass}
  try {
    const user = await UserModel.create(req.body);
    res.json({
      success: true,
      message: "Registration successful",
      user: user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error from registration api",
    });
  }
};

const login = async (req, res) => {
  // validate payload in middleware
  // check user exists in db with email
  // check password matches or not
  // send response
  // payloasd => {email, pass}
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found",
      });
    }
    
    const isPasswordMatched = user.password === req.body.password;
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "password not matched",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error from login api",
    });
  }
};

const userControlelrs = {
  register,
  login,
};

export default userControlelrs;
