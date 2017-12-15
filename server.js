import express from 'express';
import morgan from 'morgan';
import crypto from 'crypto';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
require('dotenv').config();
const models = require('./models');
const User = models.User;

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
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



var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methos", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
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


app.set('port', (process.env.API_PORT || 3001));

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
  .then((user) => { res.status(201).json({
       success: true,
       user: user,
       token: jwt.sign({email: user.email, firstName: user.firstName, id: user.id}, 'RESTFULAPIs')
     });
   })
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
app.get('/api/scores/:id', loginRequired,(req, res) => {
  Score.findById(req.params.id)
    .then(score => {
        res.json({
          success: true,
          user: score,
        });
    }).catch(err => res.json({err}));
});

app.post('/api/scores', loginRequired, (req, res) => {
  Score.create(req.body)
  .then((score) => { res.status(201).json({success: true, user: score,}); })
  .catch(err => res.json({err}));
});

app.get('/api/scores', loginRequired, (req, res) => {
  Score.findAll()
    .then((scores) => { res.json({success: true, scores: scores,}); })
    .catch(err => res.json({err}));
});

app.patch('/api/scores/:id', loginRequired, (req, res) => {
  Score.findById(req.params.id)
    .then(score => score.update(req.body))
    .then(score => {
        res.json({
          success: true,
          user: score,
        });})
    .catch(err => res.json({err}));
});

app.delete('/api/scores/:id', loginRequired, (req, res) => {
  Score.findById(req.params.id)
    .then(score => score.destroy())
    .then(() => {res.status(204).json({});})
    .catch(err => res.status(404).json({err}));
});

app.get('/api/user_scores', loginRequired, (req, res) => {
  User.findAll({
    attributes: [
      'username',
      [sequelize.literal('SUM(scores.score)'), 'scoreTotal'],
    ],
    include: [{model: models.Score, as: 'Scores'}]
  })
  .then((scores) => { res.json({...scores}); })
  .catch(err => console.log(err));
});

app.post('/api/login', (req, res) => {
  User.findOne({where: {
         $or : [{username: req.body.username}, {email: req.body.email}]
       }
     })
    .then((user) => {
      if (!user.validPassword(req.body.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        res.json({token: jwt.sign({id: user.id}, 'RESTFULAPIs', { expiresIn: 60 * 60 })})
      }
    }).catch(err => res.json({err}));
});

app.post('/api/auth/forgot_password', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then((user) => {
    const token = crypto.randomBytes(64).toString('hex');
    return user.update({
      reset_password_token: token
    })
    .then(user => user)
    .catch(err => console.log(err));
  })
  .then((user) => {
    const data = {
      to: user.email,
      from: email,
      template: 'reset-password-email',
      subject: 'Password Reset Confirmation',
      context: {
        url: 'http://localhost:3001/auth/reset_password?token=' + user.reset_password_token,
        name: user.username
      }
    };

    smtpTransport.sendMail(data, function(err) {
      if (!err) {
        res.json({ message: 'Kindly check your email for further instructions' });
      } else {
        throw err
      }
    });
  })
  .catch(err => res.json({err}));
});



export default app;
