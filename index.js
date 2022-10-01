const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/map', (req, res) => res.render('pages/map'))

app.get('/calendar', async(req, res) => res.render('pages/calendar'))
app.get('/eventform', async(req, res) => res.render('pages/eventform'))

app.post('/add-event', async(req, res) => {
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

  res.render('/calendar')

  //do something
  //render calendar
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
