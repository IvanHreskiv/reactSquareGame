import express from 'express';
import Promise from 'bluebird';
import morgan from 'morgan';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
var models = require('./models');


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
  console.log(req.body.email);
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
