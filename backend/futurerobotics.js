const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const bearerToken = require('express-bearer-token');
const server = require('http').createServer(app);
const expressValidator = require('express-validator');
const port = process.env.PORT || 4100;
const passport = require('passport');
const routes = require('./routes/routes');
const checkConn = require('./helpers/checkConn');



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  next();
});
app.use(expressValidator());
app.use(bearerToken());



/*
Increase Upload File Size
*/
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' }));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('build'));
app.use(express.static('public'));

app.use(passport.initialize());
require('./passport')(passport);
app.use('/api', routes);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/build', express.static(path.join(__dirname, 'build')));

const healthCheck = async () => {
  await checkConn.checkDbConnection();
};

server.listen(port, async () => {
  await healthCheck();
  console.log(`Listening on port ${port}`);
});
