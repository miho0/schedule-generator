const express = require('express');
const router = express.Router();

const {getFullSchedule} = require('../implementations/schedule');

// this route is used to update the data in the database as it is being scraped directly from the website

router.get('/getFull',function(req, res, next) {
    getFullSchedule().then((result) => {
        res.json({result});
    });
});

module.exports = router;
