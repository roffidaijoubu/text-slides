const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const fs = require('fs');


//change this
let doa = 'tawassul.json'







//continue
const slideDataFilePath = path.join(__dirname, 'data', doa);
const slides = JSON.parse(fs.readFileSync(slideDataFilePath, 'utf8'));

// Initialize currentSlideIndex to 0
let currentSlideIndex = 0;
let totalSlides = slides.length;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected.');

  // Emit the current slide, slide data, and currentSlideIndex when a new client connects
  socket.emit('updateSlide', slides[currentSlideIndex]);
  socket.emit('slideData', slides);
  socket.emit('currentSlideIndex', currentSlideIndex);
  socket.emit('totalSlides', totalSlides);

  // Handle 'nextSlide' event from control page
  socket.on('nextSlide', () => {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
      slides[currentSlideIndex]['index'] = currentSlideIndex + 1;
      slides[currentSlideIndex]['total'] = totalSlides;
      io.emit('updateSlide', slides[currentSlideIndex]);
    }
  });

  // Handle 'prevSlide' event from control page
  socket.on('prevSlide', () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      slides[currentSlideIndex]['index'] = currentSlideIndex + 1;
      slides[currentSlideIndex]['total'] = totalSlides;
      io.emit('updateSlide', slides[currentSlideIndex]);
    }
  });

  // Handle 'gotoSlide' event from control page
  socket.on('gotoSlide', (index) => {
    if (index >= 0 && index < slides.length) {
      currentSlideIndex = index;
      slides[currentSlideIndex]['index'] = currentSlideIndex + 1;
      slides[currentSlideIndex]['total'] = totalSlides;
      io.emit('updateSlide', slides[currentSlideIndex]);
    }
  });

  socket.on('toggleVisibility', () => {
    io.emit('toggleVisibility'); // Relay the event to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });

});


const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
