const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const updateDataRouter = require('./routes/updateData');
const scheduleRouter = require('./routes/schedule');

const path = __dirname + "/views"

const app = express();
app.use(express.static('views'))

const {connectToMongoDB} = require('./database/connection');

// const db = require('./database.js');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/updateData', updateDataRouter);
app.use('/schedule', scheduleRouter);

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:4200"],
  method: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  key: "userId",
  secret: "this-should-be-something-very-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 3600 * 3600
  }
}))

app.get("/", (req, res) => {
  res.sendFile(path + "/index.html")
})

const PORT = 3080;

app.listen(PORT, () => {
  connectToMongoDB().then(() => {});
  console.log("App listening at port 3080.");
})
