const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const durationRouter = require("./routes/duration");

//connect db
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("db connected")
);

const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

//router
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/duration", durationRouter);

app.use("/api", (req, res) => {
  res.send("halo");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
