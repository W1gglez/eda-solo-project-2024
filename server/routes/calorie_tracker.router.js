const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    const query = `SELECT 
    cl.id as log_id, 
    cl.date, 
    cl.user_id, 
    ARRAY_AGG(JSON_BUILD_OBJECT(
        'entry_id', cle.entry_id,
        'name', cle.name,
        'calories', cle.calories,
        'protein', cle.protein,
        'carbs', cle.carbs,
        'fats', cle.fats
    )) as log_entrys,
    SUM(cle.calories) as total_calories,
    SUM(cle.protein) as total_protein,
    SUM(cle.carbs) as total_carbs,
    SUM(cle.fats) as total_fats
FROM 
    calorie_log cl 
LEFT JOIN 
    cl_entry cle 
ON 
    cl.id = cle.log_id 
WHERE 
    user_id = $1 
    AND date = $2
GROUP BY 
    cl.id, 
    cl.date, 
    cl.user_id;`;
    const date = req.query.date;

    const result = await pool.query(query, [req.user.id, date]);
    res.send(result.rows).status(200);
  } catch (err) {
    console.error('Error processing /GET calorie_log', err);
    res.sendStatus(500);
  }
});

router.post('/add-entry', rejectUnauthenticated, async (req, res) => {
  if (req.body.log_id) {
    try {
      const { log_id, name, calories } = req.body;
      const protein = req.body.protein || null;
      const carbs = req.body.carbs || null;
      const fats = req.body.fats || null;

      const query =
        'INSERT INTO cl_entry (log_id, "name" ,calories, protein, carbs, fats) VALUES ($1, $2, $3, $4, $5, $6);';

      await pool.query(query, [log_id, name, calories, protein, carbs, fats]);
      res.sendStatus(201);
    } catch (err) {
      console.error('Error processing POST add-log-entry ', err);
      res.sendStatus(500);
    }
  } else {
    let query;
    try {
      query =
        'INSERT INTO calorie_log ("user_id", date) VALUES ($1, $2)returning id;';
      const date = req.body.date;

      const result = await pool.query(query, [req.user.id, date]);

      const log_id = result.rows[0].id;
      const { name, calories } = req.body;
      const protein = req.body.protein || null;
      const carbs = req.body.carbs || null;
      const fats = req.body.fats || null;

      try {
        query =
          'INSERT INTO cl_entry (log_id, "name" ,calories, protein, carbs, fats) VALUES ($1, $2, $3, $4, $5, $6);';

        await pool.query(query, [
          Number(log_id),
          name,
          calories,
          protein,
          carbs,
          fats,
        ]);
        res.sendStatus(201);
      } catch (err) {
        console.error('Error processing POST add-entry-item ', err);
        res.sendStatus(500);
      }
    } catch (err) {
      console.error('Error processing POST add-entry', err);
      res.sendStatus(500);
    }
  }
});


router.put('/edit-entry/:id', rejectUnauthenticated, async (req, res) => {
  const { name, calories } = req.body;
  const protein = req.body.protein || null;
  const carbs = req.body.carbs || null;
  const fats = req.body.fats || null;

  try {
    const query =
      'UPDATE cl_entry SET name=$2, calories=$3, protein=$4, carbs=$5, fats=$6 WHERE entry_id=$1';

    await pool.query(query, [
      req.params.id,
      name,
      calories,
      protein,
      carbs,
      fats,
    ]);
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error processing PUT update-entry/${req.params.id} `, err);
    res.sendStatus(500);
  }
});

router.delete('/remove-entry/:id', rejectUnauthenticated, async (req, res) => {
  try {
    const query = 'DELETE FROM cl_entry WHERE entry_id=$1';

    await pool.query(query, [req.params.id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(
      `Error processing DELETE remove-entry/${req.params.id} `,
      err
    );
    res.sendStatus(500);
  }
});

module.exports = router;
