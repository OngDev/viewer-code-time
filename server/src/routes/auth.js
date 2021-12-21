const express = require("express");
const router = express.Router();
const User = require("../models/user");
const createNewUser = require("../utils/createNewUser");

//login
router.post("/login", async (req, res) => {
  const nickname = req.body.nickname;

  //check user is already in db
  const userExist = await User.findOne({ nickname });
  if (userExist) return res.status(200).json({ message: "login success" });

  //create new user
  try {
    const newUser = await createNewUser(nickname);
    const user = new User(newUser);
    await user.save();
    res.status(200).json({ message: "login success" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
