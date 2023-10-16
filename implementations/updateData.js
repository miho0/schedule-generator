const {getConnection} = require('../database/connection');
const {getFullSchedule, getPrograms} = require('./scraper');

const updateSchedule = async () => {
    const db = getConnection();
    const collection = db.db("schedule_generator").collection("schedule_items");

    await getFullSchedule().then((result) => {
        console.log(result)
        collection.deleteMany({})
        collection.insertMany(result);
    },
        (error) => {
            console.log(error)
        });

}

module.exports = {updateSchedule};
