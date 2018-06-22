var express    = require('express');
var path       = require('path');
var favicon    = require('serve-favicon');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var chat = require('../routes/chat');
var app  = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname,'dist')));

app.use('/chat', chat);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*app.use((req,res,next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 */
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mean-chat')
	.then(() => console.log('connection successful'))
	.catch((err) => console.error(err));

module.exports = app;
