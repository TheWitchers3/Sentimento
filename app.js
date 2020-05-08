require("dotenv").config();

var cors = require('cors')
var express = require("express"),
  request = require("request"),
  bodyParser = require("body-parser"),
  app = express();
  app.use(cors())

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var seeds = require("./seeds.js");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/twitteranalysis", (req, res) => {
  res.render("twitter");
  
});


// var interval = setInterval(function () {

//   request(
//     "https://twittersentimentanalyticsback.herokuapp.com/notif",
//     function (err, response, body) {
//       if (!err && response.statusCode === 200) {
//         var notif = JSON.parse(body);
//         console.log(notif);
//       }
//     }
//   );
// }, 3000);


app.get("/analyze", (req, res) => {
  var query = req.query;
  var count = req.query.ntwts;
  console.log(query['searchtrend'])

  request(
    "https://twittersentimentanalyticsback.herokuapp.com/analyze?query=" + query['searchtrend'],
    function(err, response, body) {
      if (!err && response.statusCode === 200) {
        var tweetsAnalysis = JSON.parse(body);
        console.log(tweetsAnalysis);
        res.json(tweetsAnalysis);
      }
    }
  );

  // to get data from the seeds file for testing purposes
  // var tweetAnalysis = seeds;
  // res.json(tweetAnalysis);
});



app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Server started!!");
});
