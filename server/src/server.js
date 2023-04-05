require('dotenv').config();
const http = require('http');
const app = require('./app')
const mongoose = require('mongoose')
const { mongoConnect } = require('./services/mongo');
const { loadLaunchData } = require('./model/launches.model');
const { loadPlanetsData } = require('./model/planets.model')
const PORT = process.env.PORT || 8080;
const MONGO_URL = 'mongodb://sayantan_mongo:2ycYLgeTJ7GuPeKu@ac-d2aalyt-shard-00-00.wvvgihy.mongodb.net:27017,ac-d2aalyt-shard-00-01.wvvgihy.mongodb.net:27017,ac-d2aalyt-shard-00-02.wvvgihy.mongodb.net:27017/nasa?ssl=true&replicaSet=atlas-7bpmjs-shard-0&authSource=admin&retryWrites=true&w=majority'
const server = http.createServer(app);
mongoose.connection.once('open', () => {
    console.log('Mongo Db Connection is ready!')
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})
async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
}
server.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
});

startServer();
