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


class Users {
  constructor (name, pass, id) {
    this.username = name;
    this.pass = pass;
    this.id = id;
  }
}

// проверяем логин/пароль
app.post('/userlogin', function (req, res) { 
    var contentRec = JSON.parse(req.body);

    fs.readFile("./data/users.json", 'utf-8', function (err, content) {
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

// проверяем наличие юзера в базе при регистрации и при необходимости создаем новый экземпляр
// который записываем в 'базу'
app.post('/usercheckname', function (req, res) { 
    var contentRec = JSON.parse(req.body); 

    fs.readFile("./data/users.json", 'utf-8', function (err, content) {
      var contentNoJson = JSON.parse(content);
      var result = contentNoJson.find(function(item, index, array) {
         return (item.username == contentRec.username)
      });        
      if (!result) {
        res.status(200);
        res.send(JSON.stringify('false'));
        writeNewUser(contentRec, contentNoJson);
      } else {
        res.status(400);
        res.send(JSON.stringify('true'));
      }     
    }); 
});

// выводим продукты на стартовую main страницу
app.post('/products', function (req, res) {
  fs.readFile("./data/products.json", 'utf-8', function (err, content) {
    if (content) {
      res.status(200);
      res.send(JSON.stringify(content));
    } else {
      res.status(401);
      res.send("Products not found");
    }     
  }); 
});

function writeNewUser (user, database) {
  let newdatabase = database;
  let newUser = new Users (user.username, user.pass, database.length + 1);
  newdatabase.push(newUser);
  var contentJson = JSON.stringify(newdatabase);
  fs.writeFile("database.json", contentJson, function(err) {});
}


app.listen(3000, function () { 
  console.log('Example app listening on port http://localhost:3000/');
});
