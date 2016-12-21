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
    socket.emit("init", {user: "admin", msg: "Hello and welcome, how may I assist you today?"});
    socket.nummsg = 1;


    socket.on('msg', function(data){

        console.log("Message Received: %s", JSON.stringify(data));

        switch(socket.nummsg % 5){
            case 0:
            case 1:
                socket.emit("resp",{user: "admin", msg: "That answer remains the same?"});
                break;
            case 2:
                socket.emit("resp",{user: "admin", msg: "You really can't take a hint huh?"});
                break;
            case 3:
                socket.emit("resp",{user: "admin", msg: "Don't you have something better to be doing?"});
                break;
            default:
                socket.emit("resp",{user: "admin", msg: "I am sorry, I can not help you with this at this time."});
                break;
        }
        socket.nummsg += 1;
    });
});
