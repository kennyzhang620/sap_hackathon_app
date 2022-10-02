const express = require('express')
const url = require('url')
const axios = require('axios')
const cors = require("cors") 
const path = require('path')
const { pool } = require("./dbConfig");

const PORT = process.env.PORT || 5000

app = express();
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.get('/map', (req, res) => res.render('pages/map'))

  app.get('/addr', async (req, res) => {
    try {
        var commandstoDB = `SELECT * FROM sap_locations`

        const client = await pool.connect();
        const result = await client.query(commandstoDB);
        const data = { results: result.rows };

        res.json(data);
        status = 0;
        client.release();
    }
    catch (error) {
        console.log('X->', error);
        status = -2;
        res.json("None.")
    }
  });
  
  app.get('/events', async (req, res) => {
    try {
        var commandstoDB = `SELECT * FROM Schedule_Event;`

        const client = await pool.connect();
        const result = await client.query(commandstoDB);
        const data = { results: result.rows };

        res.json(data);
        status = 0;
        client.release();
    }
    catch (error) {
        console.log('X->', error);
        status = -2;
        res.json("None.")
    }
  });
  
  
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
