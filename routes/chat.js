var express = require('express');
var router  = express.Router();
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var io     = require('socket.io')(server);

var Chat   =  require('../models/Chat.js');


server.listen(4000);

// socket io
io.on('connection', (socket) => {
	console.log('User connected');
	socket.on('disconnect', ()=>{
		console.log('User disconnect');
	});

	socket.on('save-message', (data) => {
		console.log(data);
		io.emit('new-message', { message: data });
	});
});

/* GET ALL CHATS */
router.get('/', (req,res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	Chat.find({ room: req.params.room }, (err, chats) => {
		if(err) return next(err);
		res.json(chats);
	});
});

/* SAVE CHAT */
router.post('/', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	Chat.create(req.body, (err, post) => {
		if(err) return next(err);
		res.json(post);
	});
});

/*
router.get('/', (req, res, next) => {
	res.send('Express REST API');
});
*/
module.exports = router;