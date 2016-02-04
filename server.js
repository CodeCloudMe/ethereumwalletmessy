var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , bodyParser = require('body-parser')
  , logger = require('morgan')
 
var app = express()
 
var publicDir = path.join(__dirname, '')
 
app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))
app.use(bodyParser.json()) //parses json, multi-part (file), url-encoded  
 
app.get('/', function(req, res) {
  res.sendFile(path.join(publicDir, 'index.html'))
})
 
var server = http.createServer(app)
 
//reload code here 
//optional reload delay and wait argument can be given to reload, refer to [API](https://github.com/jprichardson/reload#api) below 
reload(server, app, [5], [5])
 
server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});