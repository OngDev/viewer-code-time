const express = require("express");
const router = express.Router();
const moment = require("moment");
const Duration = require("../models/duration");

//post duration
router.post("/", async (req, res) => {
  const now = moment(new Date());
  const dayStart = moment(now).startOf("date");
  const dayEnd = moment(now).endOf("date");

  try {
    const recordExist = await Duration.findOne({
      user: req.body.nickname,
      date: {
        $gte: dayStart,
        $lte: dayEnd,
      },
    });

    if (recordExist) {
      await Duration.findOneAndUpdate(
        {
          user: req.body.nickname,
          date: {
            $gte: dayStart,
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
        user: req.body.nickname,
        duration: req.body.duration,
      });

      await duration.save();
      res.status(200).json({ message: "submit duration success" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
