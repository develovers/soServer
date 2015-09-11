var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('user connected');

  socket.on('gps-data', function(data) {
    console.log('New gps-data: ' + JSON.stringify(data));
  });

  socket.on('chat-message', function(msg){
    io.emit('chat-message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3030, function(){
  console.log('listening on *:3030');
});
