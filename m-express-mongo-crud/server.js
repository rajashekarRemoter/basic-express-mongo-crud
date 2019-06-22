const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("successfully connected to DB...");
}).catch(err => {
    console.log("could not connect to DB...", err);
    process.exit();
});
require('./app/routes/note.routes.js')(app);
app.get('/', (req, res) => {
    res.json({"message": "sample get endpoint"})
});

app.listen(3000, () => {console.log("server listening on port :: 3000")});