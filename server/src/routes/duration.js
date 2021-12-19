const express = require("express");
const router = express.Router();
const moment = require("moment");
const Duration = require("../models/duration");

//post duration
router.post("/", async (req, res) => {
  const now = moment(new Date()).format();
  const startDate = moment(now).startOf("date").format();
  const endDate = moment(now).endOf("date").format();

  try {
    const recordExist = await Duration.findOne({
      user: req.body.userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    if (recordExist) {
      const savedDuration = await Duration.findOneAndUpdate(
        {
          user: req.body.userId,
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        {
          $inc: { duration: +req.body.duration },
        }
      );

      res.status(200).json(savedDuration);
    } else {
      const duration = new Duration({
        user: req.body.userId,
        duration: req.body.duration,
      });

      const savedDuration = await duration.save();
      res.status(200).json(savedDuration);
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
