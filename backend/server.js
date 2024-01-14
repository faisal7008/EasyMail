const express = require("express");
const session = require("express-session");
const cors = require('cors')
require("dotenv").config();
const passport = require("./config/passport-config");
const { connectDB } = require("./config/db");

const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("Server running on " + port);
  console.log("Waiting for DB to connect");
});

// connect database
connectDB();

// passport init
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoutes");
const mailRoutes = require("./routes/mailRoutes");

// routes
app.use("/auth", authRoutes);
app.use("/mails", mailRoutes);
