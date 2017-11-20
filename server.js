import express from 'express';
import Promise from 'bluebird';
import morgan from 'morgan';
import sqlite from 'sqlite';


const app = express();
const dbPromise = Promise.resolve()
  .then(() => sqlite.open('./database.sqlite', { Promise }))
  .then(db => db.migrate({ force: 'last'}));

app.set('port', (process.env.API_PORT || 3001));
app.disable('etag');

if (process.env.NODE_ENV !== 'TEST') {
  app.use(morgan('combined'));
}

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

app.get('/post/:id', async (req, res, next) => {
  let categories = null;
  try {
    const db = await dbPromise;
    categories = await Promise.all([
      db.all('SELECT * FROM Category')
    ]);
  } catch (err) {
    next(err);
  }
  res.json({
    success: true,
    post: categories 
  });
});

app.post('/post', async (req, res, next) => {
  let categories = null;
  try {
    const db = await dbPromise;
    categories = await Promise.all([
      db.run('INSERT INTO Category(name) VALUES(?)', 'NewName')
    ]);
    res.json({ categories: categories });
  } catch (err) {
    next(err);
    res.json({ err: err });
  }
});

export default app;
