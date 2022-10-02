const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash =require("express-flash");
const passport = require("passport");
const cors = require("cors") //cross-origin resource sharing
const axios = require('axios')
const url = require('url')

const globalAPIKey = "dQovNOSOTUaNoNZcs6Yvon0WyjM6JeULJSAbL2effgzxknVhAh"; 

//const bodyParser = require('body-parser');
const path = require('path')


const PORT = process.env.PORT || 5010;
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
//app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.post('/append', async (req,res) => {
	
	console.log(req.body);

	if (req.body.id != null) { 
    	try {
        var commandstoDB = `UPDATE sap_locations SET xcoordinate = ${req.body.lat}, ycoordinate = ${req.body.long} WHERE id = ${req.body.id};`

        const client = await pool.connect();
        const result = await client.query(commandstoDB);
        status = 0;
        client.release();
		res.send("Horray!");
		
    	}
    	catch (error) {
        console.log('X->', error);
        status = -2;
        res.json("None.")
    	}
	}
	else {
	res.send("Yay?");
}
	
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // allows us to export app for use in testing