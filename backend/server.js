const express = require("express");
const app = express();
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

/* const { Server } = require("socket.io"); */

const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const path = require("path");
connectDB();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ extended: false }));
app.use(cookieParser());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

/* const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../frontend/build");

app.use(express.static(buildPath));
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
}); */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
