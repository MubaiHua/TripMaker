const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require("dotenv").config()

//COnnect to Mongo
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=>console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

const mapApi = require('./routes/map');

const app = express();
const cors = require('cors')

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())

// Use Routes
app.use('/api/mapRoutes',mapApi);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
      });
}

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server started on port ${port}`));
