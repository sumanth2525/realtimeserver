const socket = io();

const form     = document.getElementById('form');
const input    = document.getElementById('input');
const messages = document.getElementById('messages');

// send messages
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!input.value) return;
  socket.emit('message', input.value);
  input.value = '';
});

// receive & render
socket.on('message', msg => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});
