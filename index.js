'use strict';

var port = process.env.PORT;
var host = process.env.IP;

var express = require("express");
var fs = require('fs');
var app = express();
var bodyParser = require("body-parser");
var md5 = require("md5");

app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var navs = JSON.parse(fs.readFileSync('json/navs.json', 'utf8'));
var input = createBasicInput();
var loginError = false;
var users = getUsers();
var user;
var id = 1;
var admins = getAdmins();
var orders = getOrders();

var server = app.listen(port, host);
    
app.get('/', function(req, res){
  res.render('index', input);
});

app.get('/menu', function(req, res){
  res.render('menu', input);
});

app.get('/aboutus', function(req, res){
  res.render('aboutus', input);
});

app.get('/login', function(req, res){
  input.loginError = loginError;
  res.render('login', input);
});

app.get('/signUp', function(req, res){
  res.render('signUp', input);
});

app.get('/orders', function(req, res){
  if ( user === undefined || user.isAdmin !== true ) {
     res.redirect('/');
  }
  input.orders = orders;
  res.render('orders', input);
});

app.post('/login', function(req, res){
  var username = req.body.username;
  var pwd = req.body.pwd;
  for( let i in users ){
    if( users[i].username === username ) {
      if( users[i].pwd === md5(pwd) ){
        input.loginOrName = username;
        input.loginLink = "/changedata";
        input.regOrLogout = "Kijelentkezés";
        input.regLink = "logout";
        user = {
           username: username,
           zip: users[i].zip,
           city: users[i].city,
           address: users[i].address,
           tel: users[i].tel,
           email: users[i].email,
        };
        res.redirect('/');
      }
    }
  }
  for( let i in admins ){
    if( admins[i].username === username ) {
      if( admins[i].pwd === md5(pwd) ){
        input.loginOrName = username;
        input.loginLink = "/changedata";
        input.regOrLogout = "Kijelentkezés";
        input.regLink = "logout";
        user = {
           username: username,
           zip: admins[i].zip,
           city: admins[i].city,
           address: admins[i].address,
           isAdmin: true,
           tel: admins[i].tel,
           email: admins[i].email
        }
        for(let j in navs.adminNavs){
           input.navs.push(navs.adminNavs[j]);
        }
        res.redirect('/');
      }
    }
  }
  loginError = true;
  res.redirect('login');
});

app.post('/signUp', function(req, res){
  
  var user = {
    username: req.body.username,
    pwd: md5(req.body.pwd),
    email: req.body.email,
    zip: req.body.zip,
    city: req.body.city,
    address: req.body.address,
    tel: req.body.tel
  };
  users.push(user);
  var writeable = {
    users: users
  };
  fs.writeFile('json/users.json', JSON.stringify(writeable),'utf8');
  res.redirect('/');
});

app.get('/logout', function(req,res){
   user = "";
   loginError = false;
   input = createBasicInput();
   res.redirect('/');
});

app.post('/menu', function(req,res){
   if(user === undefined){
      input.authenticError = true;
      res.redirect('/menu');
   } else {
      var foods = "";
      var price = 0;
      let i = 0;
      while(req.body[i] !== undefined){
         foods += req.body[i] + ", ";
         i++;
      }
   }
   var order = {
      id: id++,
      username: user.username,
      address: user.zip + " " + user.city + " " + user.address,
      tel: user.tel,
      price : req.body.fullPrice,
      foods: foods
   }
   orders.push(order);
   fs.writeFile('json/orders.json', JSON.stringify({orders: orders}));
   input.orderSuccess = true;
   res.redirect('/menu');
});

app.get('/changedata',function(req,res){
   if (user == undefined){
      res.redirect('/signUp')
   }
   input.user = user;
   res.render('changedata',input);
})

function createBasicInput(){
   var input = {
      navs: navs.simpleNavs,
      loginOrName: "Bejelentkezés",
      loginLink: "login",
      regOrLogout: "Regisztráció",
      regLink: "signUp"
   };
   return input;
}

app.post('/orders', function(req, res){
   for( let i in orders ){
      if( orders[i].id == req.body.index ){
         orders.splice(i,1);
         fs.writeFile('json/orders.json',orders);
         break;
      }
   }
   res.redirect('/orders');
});

app.post('/changedata',function(req,res){
   for( let i in users ){
      if ( users[i].username === user.username && user.isAdmin !== true ){
         users[i].zip = req.body.zip;
         user.zip = req.body.zip;
         users[i].city = req.body.city;
         user.city = req.body.city;
         users[i].address = req.body.address;
         user.address = req.body.address;
         users[i].email = req.body.email;
         user.email = req.body.email;
         users[i].tel = req.body.tel;
         user.tel = req.body.tel;
         fs.writeFile('json/users.json',JSON.stringify({users: users}));
      }
      else if ( users[i].username === user.username && user.isAdmin === true ){
         admins[i].zip = req.body.zip;
         user.zip = req.body.zip;
         admins[i].city = req.body.city;
         user.city = req.body.city;
         admins[i].address = req.body.address;
         user.address = req.body.address;
         admins[i].email = req.body.email;
         user.email = req.body.email;
         admins[i].tel = req.body.tel;
         user.tel = req.body.tel;
         fs.writeFile('json/users.json',JSON.stringify({admins: admins}));
      }
   }
})

function getUsers(){
   var users = JSON.parse(fs.readFileSync('json/users.json', 'utf8'));
   return users.users;
}

function getAdmins(){
   var admins = JSON.parse(fs.readFileSync('json/admins.json', 'utf8'));
   return admins.admins;
}

function getOrders(){
   var orders = JSON.parse(fs.readFileSync('json/orders.json', 'utf8'));
   return orders.orders;
}

module.exports = {
   getUsers: getUsers,
   getAdmins: getAdmins,
   getOrders: getOrders
}