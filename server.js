import express from 'express';
import Promise from 'bluebird';
import morgan from 'morgan';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import simpleOauthModule from 'simple-oauth2';
import http from 'http';
require('dotenv').config();
var models = require('./models');

console.log(process.env.CLIENT_ID);

const Op = Sequelize.Op;
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: Op,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  storage: 'database.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err); 
  });

const oauth2 = simpleOauthModule.create({
  client: {
    id: process.env.FB_CLIENT_ID,
    secret: process.env.FB_SECRET,
  },
  auth: {
    tokenHost: 'https://www.facebook.com',
    tokenPath: 'https://graph.facebook.com/oauth/access_token',
    authorizePath: '/v2.11/dialog/oauth',
  },
});

const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3001/callback',
  scope: 'email',
  state: '3(#0/!~'
});

const app = express();



app.set('port', (process.env.API_PORT || 3001));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next()
  }
});

if (process.env.NODE_ENV !== 'TEST') {
  app.use(morgan('combined'));
}

function loginRequired(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!'}); 
  }  
}

app.get('/auth', (req, res) => {
  console.log(authorizationUri);
  res.redirect(authorizationUri);
});

app.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code: code,
    redirect_uri: 'http://localhost:3001/callback'
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }

    console.log('The resulting token: ', result);
    const token = oauth2.accessToken.create(result);
    const options = {
      host: 'https://graph.facebook.com',
      path: '/me'
    };

http.get(options, function(resp){
  resp.on('data', function(chunk){
    //do something with chunk
  });
}).on("error", function(e){
  console.log("Got error: " + e.message);
});

    return res.status(200).json(token);
  });
});

const User = models.User;
app.get('/api/users/:id', loginRequired, (req, res) => {
  User.findById(req.params.id)
    .then(user => {
        res.json({
          success: true,
          user: user,
        });
    }).catch(err => res.json({err}));
});

app.post('/api/users', (req, res) => {
  User.create(req.body)
  .then((user) => { res.status(201).json({success: true, user: user,}); })
  .catch(err => res.json(err));
});

app.patch('/api/users/:id', loginRequired, (req, res) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(user => {
        res.json({
          success: true,
          user: user,
        });})
    .catch(err => res.json({err}));
});

app.delete('/api/users/:id', loginRequired, (req, res) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => {res.status(204).json({});})
    .catch(err => res.status(404).json({err}));
});

const Score = models.Score;
app.get('/api/scores/:id', (req, res) => {
  Score.findById(req.params.id)
    .then(score => {
        res.json({
          success: true,
          user: score,
        });
    }).catch(err => res.json({err}));
});

//var new_d1 = Object.keys(dict).map(function(key) {return dict[key];});
// A fake API token we validate against
app.post('/api/scores', (req, res) => {
  Score.create(req.body)
  .then((score) => { res.status(201).json({success: true, user: score,}); })
  .catch(err => res.json({err}));
});

app.patch('/api/scores/:id', (req, res) => {
  Score.findById(req.params.id)
    .then(score => score.update(req.body))
    .then(score => {
        res.json({
          success: true,
          user: score,
        });})
    .catch(err => res.json({err}));
});

app.delete('/api/scores/:id', (req, res) => {
  Score.findById(req.params.id)
    .then(score => score.destroy())
    .then(() => {res.status(204).json({});})
    .catch(err => res.status(404).json({err}));
});

app.post('/api/login', (req, res) => {
  User.findOne({where: {email: req.body.email}})
    .then((user) => {
      if (!user.validPassword(req.body.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        res.json({token: jwt.sign({email: user.email, firstName: user.firstName, id: user.id}, 'RESTFULAPIs')});
      }
    }).catch(err => res.json({err}));
});


export default app;
