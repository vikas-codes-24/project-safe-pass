require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passRoute = require("./routes/pass");
const authRoute = require("./routes/auth");
const { connectMongoDb } = require("./connection");
const PORT = 4000;

connectMongoDb(process.env.MONGO_URL).then(() =>
  console.log("MongoDB connected"),
);
const app = express();

app.use(
  cors({
    origin: "https://safe-pass-sand.vercel.app/",
  }),
);
app.use(express.json());
app.use("/password", passRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => console.log(`SERVER STARTED AT PORT : ${PORT}`));
