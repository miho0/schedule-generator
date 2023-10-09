const {getConnection} = require('../database/connection');
const {getScheduleForUser, getPrograms} = require('./scraper');

const updatePrograms = async () => {
    const db = getConnection();
    const collection = db.db("schedule_generator").collection("schedule_items");

    await getScheduleForUser().then((result) => {
        collection.deleteMany({})
        collection.insertMany(result);
    });

}

module.exports = {updatePrograms};
