const express = require("express");
const router = express.Router();
const axios = require("axios");

const User = require("../models/user");
const createNewUser = require("../utils/createNewUser");

//login
router.post("/login", async (req, res) => {
  try {
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN_URL}/userinfo`,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      }
    );

    const nickname = response.data.nickname;

    // check user is already in db
    const userExist = await User.findOne({ nickname });
    if (userExist) return res.status(200).json({ message: "login success" });

    //create new user
    const newUser = await createNewUser(nickname);
    const user = new User({
      ...newUser,
      name: response.data.name,
      avatarUrl: response.data.picture,
    });
    await user.save();

    res.status(200).json({ message: "login success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
