const express = require("express");
const app = express();
const http = require("http").createServer(app);

// for Deploy to Make A Variable
const PORT = process.env.PORT || 3000;
// Make Port for listening
http.listen(PORT, () => {
  console.log(`Listening at the port ${PORT}`);
});
// give path of css file
app.use(express.static(__dirname + "/public"));
// give index file to the respnce
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  // define event from client by socket
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
