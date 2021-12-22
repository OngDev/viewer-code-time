const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

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

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN_URL}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `${process.env.AUTH0_DOMAIN_URL}/`,
  algorithms: ["RS256"],
});

//router
app.use("/api/auth", jwtCheck, authRouter);
app.use("/api/users", userRouter);
app.use("/api/duration", jwtCheck, durationRouter);

app.use("/api", jwtCheck, (req, res) => {
  res.send("halo");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
