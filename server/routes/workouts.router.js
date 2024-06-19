const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    const query = `SELECT 
    JSON_BUILD_OBJECT(
          'workout_id', wl.id,
          'date', wl.date,
          'exercises', JSON_AGG(
              JSON_BUILD_OBJECT(
                  'exercise_name', e."name",
                  'detail_id', wd.id,
                  'set_info', (
                      SELECT ARRAY_AGG(JSON_BUILD_OBJECT(
                          'set_id', si.id,
                          'set_number', si.set_number,
                          'reps', si.reps,
                          'weight', si.weight
                      ))
                      FROM set_info si
                      WHERE si.detail_id = wd.id
                  )
              )
            )
          
      ) as workout_info
      FROM workout_log wl
      LEFT JOIN workout_details wd ON wd.workout_id = wl.id
      LEFT JOIN exercises e ON wd.exercise_id = e.id
      WHERE wl.user_id = $1 AND wl.date = $2
      GROUP BY wl.id, wl.date;`;

    const date = req.query.date; //?? new Date().toLocaleDateString();

    const result = await pool.query(query, [req.user.id, date]);
    res.send(result.rows[0]);
  } catch (err) {
    console.error('Error processing /GET workout', err);
    res.sendStatus(500);
  }
});

//Create new workout entry in workout_log for current date
router.post('/add-workout', rejectUnauthenticated, async (req, res) => {
  try {
    const query = `INSERT INTO workout_log ("user_id", date) VALUES ($1, $2);`;

    await pool.query(query, [req.user.id, req.body.date]);
    res.sendStatus(201);
  } catch (err) {
    console.error('Error processing POST add-workout', err);
    res.sendStatus(500);
  }
});

//Add new exercise with set info to workout
router.post('/add-workout-details', rejectUnauthenticated, async (req, res) => {
  const { workout_id, exercise_id, set_info } = req.body;

  try {
    //Run check to see if exercise is already in workout
    const checkQuery = `SELECT 1 FROM workout_details WHERE workout_id=$1 AND exercise_id=$2;`;
    const checkResult = await pool.query(checkQuery, [workout_id, exercise_id]);

    if (checkResult.rows.length > 0) {
      // Exercise already exists
      res.status(409).send('Exercise already exists');
    } else {
      //Exercise does not exist - Add Exercise
      const query =
        'INSERT INTO workout_details (workout_id, exercise_id) VALUES ($1, $2) RETURNING id';

      const result = await pool.query(query, [workout_id, exercise_id]);
      try {
        const query =
          'INSERT INTO set_info (detail_id, set_number, reps, weight) VALUES ($1, $2, $3, $4);';

        for (const set of set_info) {
          await pool.query(query, [
            result.rows[0].id,
            set.set_number,
            set.reps,
            set.weight,
          ]);
        }
        res.sendStatus(201);
      } catch (err) {
        console.error('Error processing POST add-workout-details', err);
        res.sendStatus(500);
      }
    }
  } catch (err) {
    console.error('Error processing POST add-workout-details', err);
    res.sendStatus(500);
  }
});

router.put('/update-set/:id', rejectUnauthenticated, async (req, res) => {
  //Route for updating set_info
  const { reps, weight } = req.body;
  try {
    const query = 'UPDATE set_info SET reps=$2, weight=$3 WHERE id=$1;';
    await pool.query(query, [req.params.id, reps, weight]);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error processing PUT /update-set:', err);
    res.sendStatus(500);
  }
});

router.delete(
  '/remove-exercise/:id',
  rejectUnauthenticated,
  async (req, res) => {
    //Route for removing exercise from workout
    try {
      const query = 'DELETE FROM workout_details WHERE id=$1';
      await pool.query(query, [req.params.id]);
      res.send('Exercise removed from workout').status(200);
    } catch (err) {
      console.error(
        `Error processing DELETE /remove-exercise/${req.params.id}:`,
        err
      );
      res.sendStatus(500);
    }
  }
);

module.exports = router;
