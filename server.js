import express from 'express';
import Promise from 'bluebird';
import morgan from 'morgan';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser'
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

if (process.env.NODE_ENV !== 'TEST') {
  app.use(morgan('combined'));
}

const User = models.User;
app.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
        res.json({
          success: true,
          user: user,
        });
    }).catch(err => res.json({err}));
});

//var new_d1 = Object.keys(dict).map(function(key) {return dict[key];});
// A fake API token we validate against
app.post('/api/users', (req, res) => {
  User.create(req.body)
  .then((user) => { res.status(201).json({success: true, user: user,}); })
  .catch(err => res.json({err}));
});

app.patch('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(user => {
        res.json({
          success: true,
          user: user,
        });})
    .catch(err => res.json({err}));
});

app.delete('/api/users/:id', (req, res) => {
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

export const API_TOKEN = 'D6W69PRgCoDKgHZGJmRUNA';

const extractToken = (req) => (
  req.query.token
);

const authenticatedRoute = ((req, res, next) => {
  const token = extractToken(req);

  if (token) {
    if (token === API_TOKEN) {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        error: 'Invalid token provided',
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      error: 'No token provided. Supply token as query param `token`',
    });
  }
});

app.get('/api/check_token', (req, res) => {
  const token = extractToken(req);

  if (token) {
    if (token === API_TOKEN) {
      return res.json({ valid: true });
    } else {
      return res.json({ valid: false });
    }
  } else {
    return res.status(400).json({
      valid: false,
      error: 'No token found in `Authorization` header',
    });
  }
});


// Make things more noticeable in the UI by introducing a fake delay
// to logins
const FAKE_DELAY = 500; // ms
app.get('/api/login', (req, res) => {
  setTimeout(() => (
    res.json({
      success: true,
      token: API_TOKEN,
    })
  ), FAKE_DELAY);
});


export default app;
