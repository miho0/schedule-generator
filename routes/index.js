var express = require('express');
var router = express.Router();

const { scrape } = require('../implementations/scraper');
const {log} = require("debug");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Schedule generator'});
});

router.get('/scrape', function(req, res, next) {
    scrape().then((result) => {
        res.json({result});
    });
});


module.exports = router;
