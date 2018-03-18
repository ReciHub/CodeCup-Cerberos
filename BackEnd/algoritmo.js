var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));


var input = {};

app.post('/addUser', (req, res) => {
   // First read existing users.
    console.log(req.body.WIFI);
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        if(err) console.log(404);
        input = JSON.parse(data);
        input.fp.push(req.body.WIFI);
        input = JSON.stringify(input, null, ' ');
        fs.writeFile(__dirname + "/" + "users.json", input, function (err) {
            if(err) console.log(404);
        });
        res.json({
            errors: ['Failed to create photo']
        });
    });
})
    


app.get('/listUsers', function (req, res) {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      res.end(data);
  });
})



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

