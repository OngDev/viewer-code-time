const express = require("express");
const router = express.Router();
const moment = require("moment");
const axios = require("axios");

const Duration = require("../models/duration");

//post duration
router.post("/", async (req, res) => {
  const now = moment(new Date());
  const dayStart = moment(now).startOf("date").toDate();
  const dayEnd = moment(now).endOf("date").toDate();

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

    const recordExist = await Duration.findOne({
      nickname,
      date: {
        $gt: dayStart,
        $lte: dayEnd,
      },
    });

    if (recordExist) {
      await Duration.findOneAndUpdate(
        {
          nickname,
          date: {
            $gt: dayStart,
            $lte: dayEnd,
          },
        },
        {
          $inc: { duration: +req.body.duration },
          date: now,
        }
      );

      res.status(200).json({ message: "submit duration success" });
    } else {
      const duration = new Duration({
        nickname,
        duration: +req.body.duration,
      });

      await duration.save();
      res.status(200).json({ message: "submit duration success" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
