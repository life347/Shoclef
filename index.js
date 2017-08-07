var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection',function(socket){
    console.log('one user connected '+socket.id);
    socket.on('message',function(data){
       // var sockets = io.sockets.sockets;
        Object.keys(io.sockets.sockets).forEach(function(sock){
            if(sock.id != socket.id)
            {
				socket.broadcast.to(sock).emit('message',{message:data});
				console.log(data);
            }
        })
		
        //socket.broadcast.emit('message', data);
    })
    socket.on('disconnect',function(){
        console.log('one user disconnected '+socket.id);
    })
})
http.listen(9000, function() {
    console.log('listening on port 9000');
})

