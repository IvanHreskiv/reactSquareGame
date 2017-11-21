import express from 'express';
import Promise from 'bluebird';
import morgan from 'morgan';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser'
const Users = require('./models/user');


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
app.disable('etag');

if (process.env.NODE_ENV !== 'TEST') {
  app.use(morgan('combined'));
}

app.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
        res.json({
          success: true,
          user: user,
        });
    })
});
// A fake API token we validate against
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
  //setTimeout(() => (
    res.json({
      success: true,
      token: API_TOKEN,
    });
  //), FAKE_DELAY);
});


export default app;
