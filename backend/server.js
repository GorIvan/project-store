var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/user', function (req, res) { // req - обьект запроса, res -- обьект ответа
    var contentRec = JSON.parse(req.body);

    fs.readFile("baza.json", 'utf-8', function (err, content) {
      var contentNoJson = JSON.parse(content);
      
      contentNoJson.forEach(function(item, i, arr) {
        if (item.login == contentRec.login && item.pass == contentRec.pass) {
          console.log(item.id);
          res.send(JSON.stringify(item.id));
        }
      });
      
    });
 

});


// app.get('/users', function (req, res) { // req - обьект запроса, res -- обьект ответа
//   const users = getDataFromDataBasse(); 

//   res.send(users);
// });


app.listen(3000, function () { // говорим на каком порту запускать нашу  NODE_JS  программу.
  console.log('Example app listening on port http://localhost:3000/');
});