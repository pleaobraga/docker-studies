import express from 'express'
import mysql from 'mysql2/promise'

const app = express()
const port = 3000

const pool = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

app.get('/', async (req, res) => {
  try {
    const sql = `SELECT name FROM people`;
    const [names] = await pool.query(sql);

    const namesList = names
      .map((person) => `<li>${person.name}</li>`)
      .join('');

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>${namesList}</ul>
    `);
  } catch (error) {
    console.error('Database query error:', error.message);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
    console.log('Server running port ' + port )
})
