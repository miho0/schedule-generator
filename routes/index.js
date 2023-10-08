var express = require('express');
var router = express.Router();

const { getScheduleForUser, getPrograms } = require('../implementations/scraper');
const {log} = require("debug");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Schedule generator'});
});

router.get('/getPrograms', function(req, res, next) {
    getPrograms().then((result) => {
        res.json({result});
    });
});

router.get('/getSchedule', function(req, res, next) {
    getScheduleForUser().then((result) => {
        res.json({result});
    });
});



module.exports = router;
