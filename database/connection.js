const { connectionInfo } = require('./connectionInfo');
const { MongoClient } = require('mongodb');

let client;

const connectToMongoDB = async () => {
    try {
        if (!client) {
            client = await MongoClient.connect(connectionInfo.connectionString, { useNewUrlParser: true });
            console.log("Connected to MongoDB");
        }
        return client;
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        throw e; // Throw the error to propagate it to the calling code
    }
};

const getConnection = () => {
    if (!client) {
        console.error("MongoDB client is not connected. Call connectToMongoDB first.");
        return null; // Return null or handle the absence of a connection as needed
    }
    return client;
};

module.exports = { connectToMongoDB, getConnection };
