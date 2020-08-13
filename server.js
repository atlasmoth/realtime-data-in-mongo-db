require("dotenv").config();
const express = require("express");
const db = require("./db");
const http = require("http");
const socket = require("socket.io");
const Stuff = require("./stuff");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// handling rejections
process.on("unhandledRejection", (e) => {
  console.log("Server error", e);
  process.exit(1);
});

// boilerplate setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const server = http.createServer(app);

// setting up db and server

db()
  .then(() => {
    server.listen(3000, () => console.log(`listening to 3000.`));
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
app.post("/create", async (req, res, next) => {
  try {
    const stuffDoc = await Stuff.create({
      head: "titular stuff",
      body: "main stuff",
    });
    res.send({
      success: true,
      message: "doc created successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "server error",
    });
  }
});
//

// setting up sockets
const io = socket(server);

// connection socket.io
io.on("connection", (socket) => {
  console.log("We outchea");
});

const stuffStream = Stuff.watch([
  { $addFields: { rando: crypto.randomBytes(20).toString("hex") } },
]);
stuffStream.on("change", (item) => {
  if (item.operationType === "insert") {
    const blob = fs.createReadStream(path.join(__dirname, "/public/dummy.pdf"));
    const data = [];
    blob.on("data", (chunk) => data.push(chunk));
    blob.on("end", () => {
      io.emit("data", Buffer.concat(data));
    });
  }
});
