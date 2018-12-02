// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// listen for requests :)
const server = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + server.address().port);
});

const io = require('socket.io')(server);    //http://socket.io/docs/
const name_spaced_com = io.of('/collage'); 

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


name_spaced_com.on('connection', function (socket) {
  
  //setTimeout(() => name_spaced_com.emit('color', square, index), 500)
  
  console.log("Client ID"+socket.id+" connected");
  
  app.get('/addsrc', function(request, response) {
    
    let newsrc = request.query.src
    
    let x = request.query.x
    let y = request.query.y
    

    response.send("ok" +  (newsrc ? ", setze " + newsrc + " auf " + x +"," + y  : ", mache aber nix"))
    
    name_spaced_com.emit('newsrc', newsrc, x, y);
  });
});


