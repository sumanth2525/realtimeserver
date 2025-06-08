io.on('connection', socket => {
  // existing chat handlers here…

  // when a client joins audio chat
  socket.on('webrtc-join', () => {
    // let everyone else know there’s a new peer
    socket.broadcast.emit('webrtc-new-user', { socketId: socket.id });
  });

  socket.on('webrtc-offer', ({ to, offer }) => {
    io.to(to).emit('webrtc-offer', { from: socket.id, offer });
  });

  socket.on('webrtc-answer', ({ to, answer }) => {
    io.to(to).emit('webrtc-answer', { from: socket.id, answer });
  });

  socket.on('webrtc-ice-candidate', ({ to, candidate }) => {
    io.to(to).emit('webrtc-ice-candidate', { from: socket.id, candidate });
  });
});
