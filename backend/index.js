const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/connectDb");
const router = require("./router/user.router");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

//! Router
app.use("/api/v1", router);
// app.post("/api/v1/login");

//! Error handlers
app.use((err, req, res, next) => {
  const errMsgs = err.message.split(":");
  const errMsg = errMsgs[errMsgs.length - 1];
  res.status(500).json({ error: true, message: errMsg });
});

//! Page Not found
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

// Start the server
const startServer = async () => {
  await connectDb(process.env.MONGO_URL);
  console.log("MongoDB server started");
  app.listen(process.env.PORT, (err) => {
    if (err) throw console.error(err);
    console.log(
      `Server is running on port http://localhost:${process.env.PORT}`
    );
  });
};

startServer();
