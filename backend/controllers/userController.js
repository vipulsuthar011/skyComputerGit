import userModal from "../modals/userModal.js";
import { generateToken } from "./authController.js";
export const signup = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const userExist = await userModal.findOne({ phoneNumber });
    if (userExist) {
      res.status(200).json({
        message: "User already exist",
        success: false,
      });
    } else {
      const newUser = new userModal(req.body);
      await newUser.save();
      res
        .status(200)
        .json({ message: "User signed up successfully", success: true });
    }
  } catch (error) {
    res.status(200).json({
      message: "Please try after some time",
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const userExist = await userModal.findOne({
      $and: [{ phoneNumber, password }],
    });
    console.log(userExist)
    console.log("this is ser", userExist);
    if (userExist) {
      const authToken = generateToken(userExist._id);
      res.status(200).json({
        message: "User Logged in successfully",
        data: userExist,
        authToken: authToken,
        success: true,
      });
    } else {
      console.log("dfdsf")
      res.status(200).json({
        message: "Invalid phone number or password",
        success: false,
    
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Please try after some time",
      success: false,
      error: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  // console.log(req)
  console.log("hlfsdf",req.user)
  try {
    const user = await userModal.findOne({ _id: req.user });
    console.log("this is suer",user)
    if (user) {
      res.status(200).json({
        message: "User Profile fetched successfully",
        success: true,
        data: user,
      });
    } else {
      res.status(200).json({
        message: "User do not exist",
        success: false,
        data: user,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Please try after sometime",
      success: false,
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userData = await userModal.findOne({ _id: req.user.userId });
    await userData.updateOne(req.body);
    res.status(200).json({
      message: "User Profile Updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(200).json({
      message: "Please try after sometime",
      success: false,
      error: error.message,
    });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userData = await userModal.findOne({ _id: req.user.userId });
    await userData.updateOne({password:password});
    res.status(200).json({
      message: "User Password Changed successfully",
      success: true,
    });
  } catch (error) {
    res.status(200).json({
      message: "Please try after sometime",
      success: false,
      error: error.message,
    });
  }
};
