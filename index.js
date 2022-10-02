const express = require('express')
const path = require('path')
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
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/calendar'))
app.get('/map', (req, res) => res.render('pages/map'))

app.get('/calendar', async(req, res) => res.render('pages/calendar'))
app.get('/eventform', async(req, res) => res.render('pages/eventform'))
router.setRoutes(app, "/events", storage);


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

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
