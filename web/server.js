const express = require("express");
const mysql = require("mysql2");

const app = express();

const connectWithRetry = () => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.log("DB not ready, retrying in 3s...");
      setTimeout(connectWithRetry, 3000);
    } else {
      console.log("DB connected");
    }
  });
};

connectWithRetry();

app.get("/", (req, res) => {
  res.send("Hello from Web Server");
});

app.listen(3000, () => console.log("Server started"));


