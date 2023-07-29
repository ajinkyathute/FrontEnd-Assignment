// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");
const { response } = require('express');

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    var stocksTicker = req.body["stocksTicker"];
    var inputDate = req.body["inputDate"];
    var polygonUrl = "https://api.polygon.io/v1/open-close/" + stocksTicker +"/" + 
    inputDate+ "?adjusted=true&apiKey=ehdSpdPDVWbMKKroxu2aprm847LUxe75";

    var responseBody = {}

    axios.get(polygonUrl).
    then((response) => response.data).
    then((data) => {

        res.json({
            "open":data.open,
            "high":data.high,
            "low":data.low,
            "close":data.close,
            "volume":data.volume
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send();
    });
    
    // res.json(res);
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}`));