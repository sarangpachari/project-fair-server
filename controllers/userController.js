const users = require("../models/userModel");
const jwt = require('jsonwebtoken')

//REGISTER
exports.registerController = async (req, res) => {
  console.log("INSIDE REGISTER CONTROLLER");
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("User Already Exists, Please Login !");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        linkedin: "",
        profilePic: "",
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json(error);
  }

  res.status(200).json("REQUEST RECEIVED !");
};

//LOGIN
exports.loginController = async (req, res) => {
  console.log("INSIDE LOGIN CONTROLLER");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
        //GENERATE TOKEN
        const token = jwt.sign({userId:existingUser._id}, process.env.JWTPASSWORD)
      res.status(200).json({
        user: existingUser,
        token
      });
    } else {
      res.status(404).json("Invalid Email/Password !");
    }
  } catch (error) {
    res.status(401).json(error);
  }

 
};

//PROFILE UPDATION
exports.editUserController = async (req, res) => {
  console.log("INSIDE EDIT USER CONTROLLER");
  //GET THE ID OF USER FROM JWT MIDDLEWARE
  const userId = req.userId
  const {username,email,password,github,linkedin,profilePic} = req.body
  const uploadProfileImgFile = req.file?req.file.filename:profilePic
  try {
    const updateUser = await users.findByIdAndUpdate({_id:userId},{
      username,
      email,
      password,
      github,
      linkedin,
      profilePic:uploadProfileImgFile
    },{new:true})
    await updateUser.save()
    res.status(200).json(updateUser)
  } catch (error) {
    res.status(401).json(error)
  }
}
