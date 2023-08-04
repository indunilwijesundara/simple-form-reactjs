const express = require('express');
const router = express.Router();
const pool = require('./db'); 


router.get('/person', async (req, res) => {
  try {
    const query = 'SELECT * FROM person';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/person/add', async (req, res) => {
  const { name, address, gender } = req.body;

  try {
    const query = 'INSERT INTO person (name, address, gender) VALUES ($1, $2, $3)';
    await pool.query(query, [name, address, gender]);
    res.json({ message: 'Person added successfully' });
  } catch (error) {
    console.error('Error adding person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.put('/person/:id', async (req, res) => {
  try {
    const personId = parseInt(req.params.id);
    const { name, address, gender } = req.body;

    const query = 'UPDATE person SET name = $1, address = $2, gender = $3 WHERE id = $4';
    const result = await pool.query(query, [name, address, gender, personId]);

    if (result.rowCount === 1) {
      res.json({ message: 'Person updated successfully' });
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.delete('/person/:id', async (req, res) => {
  try {
    const personId = parseInt(req.params.id);
    const query = 'DELETE FROM person WHERE id = $1';
    const result = await pool.query(query, [personId]);

    if (result.rowCount === 1) {
      res.json({ message: 'Person deleted successfully' });
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
