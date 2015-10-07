var app = require('express')();
var server = require('http').createServer(app);
var config = require('./config');
var io = require('socket.io')(server);
require('./routes')(app);
// require('./config/socketio')(socketio);
require('./config/express')(app);

io.on('connection', function(socket){
  console.log('user connected');

  socket.on('activity', function(msg){
    console.log("SEND ACTIVITY");
    console.log(JSON.stringify(msg));
    io.emit('activity', msg);
  });

  socket.on('socket:activity', function(msg){
    console.log("SEND ACTIVITY");
    console.log(JSON.stringify(msg));
    io.emit('activity', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(config.port, config.ip, function(){
  console.log('listening on '+config.ip+':'+config.port);
});
