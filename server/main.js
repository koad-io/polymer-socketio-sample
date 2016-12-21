/**
 * Created by Karl Moad on 12/15/16.
 */
var socketioJwt = require('socketio-jwt');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 9000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});


// io.set('authorization', socketioJwt.authorize({
//     secret: 'SAMPLE',
//     algorithm: 'HS512',
//     handshake: true
// }));


io.on('connection', function(socket){

    console.log("connection established");
    socket.emit("Hello and welcome, how may I assist you today?");



    socket.on('msg', function(data){

        console.log("Message Received: %s", JSON.stringify(data));

        socket.emit('resp', "Im sorry, at this time I can not help you with this.");
    });
});
