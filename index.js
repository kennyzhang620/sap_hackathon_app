const express = require('express')
const url = require('url')
const axios = require('axios')
const cors = require("cors") 
const path = require('path')
<<<<<<< HEAD
const bodyParser = require('body-parser')
const { Pool }=require("./database")
const router = require("./router");
const Storage = require("./storage");
const storage = new Storage(Pool);
const { Client } = require('pg');

const connectionString= "postgres://onvjuotq:ADpMvrk97ybLIUgw_uA6AM_LObaBTHal@heffalump.db.elephantsql.com/onvjuotq";
const client = new Client({
    connectionString: connectionString
});
client.connect();

//router.setRoutes(app, "/events", storage);

const PORT = process.env.PORT || 5000

app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/calendar'))
app.get('/map', (req, res) => res.render('pages/map'))

app.get('/calendar', async(req, res) => res.render('pages/calendar'))
app.get('/eventform', async(req, res) => res.render('pages/eventform'))
//router.setRoutes(app, "/events", storage);

app.post('/events', async(req,res)=>{

  console.log(req.body);
//res.render(console.log("found"))

res.send("abc")
let text= req.body.text;
let start_date= req.body.start_date;
let end_date=req.body.end_date;
console.log(text,start_date,end_date);

client.query(`SELECT * FROM events WHERE start_date=$1 OR end_date=$2`,[start_date, end_date],(err,results)=>{
  if (err){
    throw err;
  }

  else{
    client.query(`INSERT INTO events (text,start_date,end_date) VALUES ($1,$2,$3)`,
    [text, start_date, end_date],(err,results)=>{
     if(err){
       throw err;
     }
     console.log(results.rows);
    })
  }

})
});





/*app.post('/add-event', async(req, res) => {
  var title = req.body.f_title;
  var time = req.body.f_time;
  var attendance = req.body.f_attendance;
  var desc = req.body.f_desc;

  var events = [];

  var newEvent = {
    title: title,
    time: time,
    attendance: attendance,
    description: desc,
  }

  events.push(newEvent);

  res.render('pages/calendar')

  //do something
  //render calendar
})*/
app.get('/init', function(req, res){
  client.event.insert({
      text:"My test event A",
      start_date: new Date(),
      end_date:   new Date()
  });
  client.event.insert({
      text:"One more test event",
      start_date: new Date(),
      end_date:   new Date(),
      color: "#DD8616"
  });

  /*... skipping similar code for other test events...*/

  res.send("Test events were added to the database")
});


app.get('/data', function(req, res){
  client.event.find().toArray(function(err, data){
      //set id property for all records
      for (var i = 0; i < data.length; i++)
          data[i].id = data[i]._id;

      //output response
      res.send(data);
  });
});

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
