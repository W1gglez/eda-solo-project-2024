const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', async (req, res) => {
  // Validate and get query parameters
  const searchQuery = req.query.musclegroup ?? (req.query.search || '');
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = 25;
  const offset = (page - 1) * pageSize;
  console.log('Search Query', typeof searchQuery);

  // Determine if the search is for a muscle group or exercise name
  const isMuscleGroupSearch = req.query.musclegroup || undefined;

  let query;
  let queryParams;
  let countQuery;

  if (isMuscleGroupSearch) {
    query = `
      SELECT exercises.id, exercises.name as name, STRING_AGG(musclegroups.name, ', ') as musclegroup_name 
      FROM exercise_muscles
      JOIN exercises ON exercise_muscles.exercise_id = exercises.id 
      JOIN musclegroups ON exercise_muscles.muscle_id = musclegroups.id 
      WHERE musclegroups.name ILIKE $1 
      GROUP BY exercises.id 
      LIMIT $2 
      OFFSET $3;
    `;
    queryParams = [`%${searchQuery}%`, pageSize, offset];
    countQuery = `SELECT COUNT(exercises.id) FROM exercises 
JOIN exercise_muscles ON exercise_muscles.exercise_id = exercises.id 
JOIN musclegroups ON exercise_muscles.muscle_id = musclegroups.id 
WHERE "musclegroups"."name" ILIKE $1;`;
  } else {
    query = `
      SELECT exercises.id, exercises.name 
      FROM exercises 
      WHERE exercises.name ILIKE $1 
      ORDER BY exercises.id 
      LIMIT $2 
      OFFSET $3;
    `;
    queryParams = [`%${searchQuery}%`, pageSize, offset];
    countQuery = `SELECT COUNT(*) FROM exercises WHERE name ILIKE $1;`;
  }

  try {
    const countResult = await pool.query(countQuery, [`%${searchQuery}%`]);
    const totalRows = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalRows / pageSize);

    const result = await pool.query(query, queryParams);

    res.send({ data: result.rows, totalPages });
  } catch (err) {
    console.error('Error processing GET exercises', err);
    res.sendStatus(500);
  }
});

//Return exercises filtered by musclegroup
// router.get('/bymusclegroup', async (req, res) => {
//   // Validate and get query parameters
//   const searchQuery = req.query.search;
//   const page = parseInt(req.query.page, 10) || 1;
//   const pageSize = 25;

//   const query = `
//     SELECT exercises.id, "exercises"."name" as exercise_name, STRING_AGG("musclegroups"."name", ', ') as musclegroup_name
//     FROM exercise_muscles
//     JOIN exercises ON exercise_muscles.exercise_id = exercises.id
//     JOIN musclegroups ON exercise_muscles.muscle_id = musclegroups.id
//     WHERE "musclegroups"."name" ILIKE $1
//     GROUP BY exercises.id
//     LIMIT $2
//     OFFSET $3;
//     `;
//   const searchTerm = `%${searchQuery}%`;
//   const offset = (page - 1) * pageSize;

//   try {
//     const result = await pool.query(query, [searchTerm, pageSize, offset]);
//     res.send(result.rows);
//   } catch (err) {
//     console.error('Error processing GET exercises', err);
//     res.sendStatus(500);
//   }
// });

// //Returns results containing searchQuery paginated or all results 25 at a time
// router.get('/', async (req, res) => {
//   // Validate and get query parameters
//   const searchQuery = req.query.search || '';
//   const page = parseInt(req.query.page, 10) || 1;

//   const query = `SELECT exercises.id, exercises.name FROM exercises WHERE name ILIKE $1 ORDER BY id LIMIT 25 OFFSET $2 ;`;
//   const searchTerm = `%${searchQuery}%`;
//   const offset = (page - 1) * 25;

//   try {
//     const result = await pool.query(query, [searchTerm, offset]);
//     res.send(result.rows);
//   } catch (err) {
//     console.error('Error processing GET exercises', err);
//     res.sendStatus(500);
//   }
// });

router.get('/musclegroups', async (req, res) => {
  const query = 'SELECT * FROM musclegroups;';
  try {
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (err) {
    console.error('Error processing GET muscle groups', err);
    res.sendStatus(500);
  }
});


//Given an exercise id returns all fields for that exercise
router.get('/details/:id', async (req, res) => {
  const query = `SELECT exercises.*, ARRAY_AGG(JSON_BUILD_OBJECT(
'step_number',steps.step_number,
'description',steps.description
)) as "steps"
FROM exercises JOIN steps ON steps.exercise_id = exercises.id 
WHERE exercises.id=$1
GROUP BY exercises.id, exercises.name;`;
  try {
    const result = await pool.query(query, [req.params.id]);
    res.send(result.rows);
  } catch (err) {
    console.error(`Error processing GET exercise id:${req.params.id}`, err);
    res.sendStatus(500);
  }
});

// Stretch - Add Exercise from form
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
});

module.exports = router;
