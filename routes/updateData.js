const express = require('express');
const router = express.Router();

const {updateSchedule} = require('../implementations/updateData');

// this route is used to update the data in the database as it is being scraped directly from the website

router.get('/schedule', async function(req, res, next) {
    await updateSchedule();
    res.json({result: "success"});
});

module.exports = router;
