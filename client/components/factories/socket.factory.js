angular.module('StarterApp').factory('socketio', function(socketFactory) {
    var myIoSocket = io();

    mySocket = socketFactory({
        prefix: '',
        ioSocket: myIoSocket
    });

    return mySocket;
});