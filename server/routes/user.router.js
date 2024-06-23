const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

router.post('/add-user-info', async (req, res) => {
  const { user_id, height, weight, age, gender, bmr } = req.body;

  try {
    await console.log(req.body);
    const query = `INSERT INTO user_info (user_id, height, weight, age, gender, bmr) VALUES ($1, $2, $3, $4, $5, $6);`;
    await pool.query(query, [user_id, height, weight, age, gender, bmr]);
    try {
      const query = 'UPDATE "user" SET registered = true WHERE id=$1';
      await pool.query(query, [user_id]);
    } catch (err) {
      console.error('Update user failed: ', err);
    }
    res.sendStatus(201);
  } catch (err) {
    console.error('Add user info failed:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
