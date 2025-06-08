// 1. Bring in express and http
const express = require("express");
const app = express();
const http = require("http").createServer(app);

// 2. Import Socket.IO and attach to the HTTP server
const { Server } = require("socket.io");
const io = new Server(http, {
  cors: { origin: "*" }        // adjust CORS as needed
});

// 3. (Optional) Serve your front-end from a 'public' folder
app.use(express.static("public"));

// 4. Wire up your socket handlers
io.on("connection", socket => {
  console.log("⚡️ new client connected:", socket.id);

  socket.on("message", msg => {
    // broadcast the message to everyone
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔌 client disconnected");
  });
});

// 5. Listen on the port Render gives us, or fallback to 10000 locally
const PORT = process.env.PORT || 10000;
http.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
