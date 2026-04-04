const express = require('express');
const app = express();
const { sql, connectDB } = require('./database/connection');

// Connect to the database
connectDB();

app.use(express.json());

// Initial route
app.get('/orders', async (req, res) => {
  try {
    const result = await sql.query`
    SELECT * FROM service_orders
    `;

    res.json(result.recordset);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching orders.');
  }

});

// New route - Create order
app.post('/orders', async (req, res) => {
  try {
    const {
      sector,
      local,
      requester,
      problem_description
    } = req.body;

    await sql.query`
     INSERT INTO service_orders (sector, local, requester, problem_description)
     VALUES (${sector}, ${local}, ${requester}, ${problem_description})
     `;

    res.send('Order saved successfully ✅');

  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving order.');
  }
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
})
