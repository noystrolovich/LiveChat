const express = require('express');
const connectDB = require('./config/db')
const app = express();
const cors = require('cors');
const http = require('http');
const accountsController = require('./controllers/accountsController');

const server = http.createServer(app);
const { Server } = require("socket.io");
const { log } = require('console');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

connectDB()
app.use(cors())
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use('/accounts',accountsController);


const activeSessions = {}; // אובייקט לאחסון סשנים פעילים

io.on('connection', (socket) => {
    

  // כאשר נשלחת הודעה
  socket.on('sendMessage', (message) => {
    const data = {
      name: message.sender,
      message: message.msg,
    };

    console.log(`Message received from ${data.name}: ${data.message}`);

    // שליחה לכל הסשנים (כולל השולח)
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log(`${activeSessions[socket.id]} disconnected`);
    delete activeSessions[socket.id]; // מחיקת הסשן כאשר הלקוח מתנתק
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
