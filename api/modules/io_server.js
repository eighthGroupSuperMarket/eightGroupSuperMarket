//创建服务器  【共享中转站】
// var server = require('http').createServer();
//创建io实例
// var io = require('socket.io')(server);
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// http.listen(88);

//监听客户端连接，并在其中完成主要逻辑代码【中转站】
io.on('connection',function(socket){
    
    socket.on('startPrint',function(par2){
    	console.log(par2);
        io.emit('printOrder',par2);
    });
});
http.listen(66);
console.log('startServer',66);

