const {getConnection} = require('../database/connection');

const getSchedule = async () => {
    try {
        const db = getConnection();
        const collection = db.db("schedule_generator").collection("schedule_items");

        const documents = await collection.find({}).toArray();
        return documents;
    } catch (err) {
        console.error('Error fetching documents:', err);
        throw err; // Re-throw the error to propagate it
    }
};


module.exports = {getSchedule};
