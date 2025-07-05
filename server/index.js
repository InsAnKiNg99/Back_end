require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUsersOnly } = require("./middleware/auth.js");
const cors = require("cors");
const userRouter = require("./routes/users.route.js");
const postRouter = require("./routes/posts.route.js")

const port = process.env.PORT; //port env var
const MONGO_URI = process.env.MONGO_URI; //mongo_URI env var
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json()); // for JSON body parsing
app.use(express.urlencoded({ extended: false })); // making use of urlencode

app.use("/api/users", userRouter);
app.use("/api/posts", restrictToLoggedInUsersOnly, postRouter);

// MongoDB Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(port, () => console.log(`Server running on port ${port}`)); // starting server
  })
  .catch(() => {
    console.log("Connection Failed");
  });
