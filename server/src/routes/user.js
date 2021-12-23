const express = require("express");
const router = express.Router();
const moment = require("moment");

const User = require("../models/user");

router.get("/", async (req, res) => {
  const now = moment(new Date());
  const dayStart = moment(now).startOf("date").toDate();
  const oneWeekAgo = moment().subtract(7, "d").toDate();
  const oneMonthAgo = moment().subtract(1, "months").toDate();
  const oneYearAgo = moment().subtract(1, "years").toDate();

  let timeQuery = undefined;

  switch (req.query.by) {
    case "day":
      timeQuery = dayStart;
      break;

    case "week":
      timeQuery = oneWeekAgo;
      break;

    case "month":
      timeQuery = oneMonthAgo;
      break;

    case "year":
      timeQuery = oneYearAgo;
      break;

    default:
      timeQuery = dayStart;
  }

  try {
    const ranking = await User.aggregate([
      {
        $lookup: {
          from: "durations",
          localField: "nickname",
          foreignField: "nickname",
          as: "durations",
        },
      },
      {
        $project: {
          nickname: 1,
          name: 1,
          avatarUrl: 1,
          repos: 1,
          durations: {
            $filter: {
              input: "$durations",
              as: "durations",
              cond: {
                $gte: ["$$durations.date", timeQuery],
              },
            },
          },
        },
      },
      {
        $addFields: {
          totalTime: {
            $sum: "$durations.duration",
          },
        },
      },
      {
        $match: {
          totalTime: { $gt: 0 },
        },
      },
      {
        $project: {
          nickname: 1,
          name: 1,
          avatarUrl: 1,
          repos: 1,
          totalTime: 1,
        },
      },
      {
        $sort: {
          totalTime: -1,
        },
      },

      {
        $limit: 10,
      },
    ]);

    res.status(200).json(ranking);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
