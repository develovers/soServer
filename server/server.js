#!/bin/env node

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var numClientes=0;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  numClientes++;
  if(numClientes > 1){
  io.emit("status-user",numClientes + " Users Online in the moment.");
} else {
  io.emit("status-user",numClientes + " User Online in the moment.");
}
  
  console.log('user connected');

  socket.on('gps-data', function(location) {
    console.log('New gps-data: ' + JSON.stringify(location));
    //obj = JSON.parse(location);
    //var latitude = obj.latitude;
    //var longitude = obj.longitude;
    io.emit('gps-data', "lat: "+ location.latitude + " log: "+ location.longitude);
  });

  socket.on('chat-message', function(msg){
    io.emit('chat-message', ((new Date()).toString()).substring(15,24)+" |- "+msg);
  });

  socket.on('disconnect', function(){
     numClientes--;
 
  if(numClientes > 1){
  io.emit("status-user",numClientes + " Users Online in the moment.");
} else {
  io.emit("status-user",numClientes + " User Online in the moment.");
}
    console.log('user disconnected');
  });
});


http.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port '+port + ' whith the host '+ ipaddress );
});

console.log("Listening to " + ipaddress + " : " + port + "...");
