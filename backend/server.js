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

// проверяем логин/пароль
app.post('/userlogin', function (req, res) { 
    var contentRec = JSON.parse(req.body);

    fs.readFile("database.json", 'utf-8', function (err, content) {
      var contentNoJson = JSON.parse(content);
      var result = contentNoJson.find(function(item, index, array) {
         return (item.username == contentRec.username && item.pass == contentRec.pass)
      });
          
      if (result) {
        res.status(200);
        res.send(JSON.stringify(result.id));
      } else {
        res.status(401);
        res.send(JSON.stringify('User not found'));
      }     
    }); 
});

// проверяем наличие юзера в базе при регистрации
app.post('/usercheckname', function (req, res) { 
    var contentRec = JSON.parse(req.body);    
    fs.readFile("database.json", 'utf-8', function (err, content) {
      var contentNoJson = JSON.parse(content);
      var result = contentNoJson.find(function(item, index, array) {
         return (item.username == contentRec.username)
      });        
      if (!result) {
        res.status(200);
        res.send(JSON.stringify('false'));
        writeNewUser(contentRec, contentNoJson);
      } else {
        res.send(JSON.stringify('true'));
      }     
    }); 
});


function writeNewUser (user, database) {
  let newdatabase = database;
  newdatabase.push(user);
  var contentJson = JSON.stringify(newdatabase);
  console.log (contentJson);
  fs.writeFile("database.json", contentJson, function(err) {});
}


app.listen(3000, function () { 
  console.log('Example app listening on port http://localhost:3000/');
});
