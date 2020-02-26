require("dotenv").config();
const cors = require('cors')({ origin: true });

var express = require("express"),
  request = require("request"),
  bodyParser = require("body-parser"),
  app = express();
  app.use(cors())

const http = require('http');

var seeds = require("./seeds.js");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  cors(req, res, async () => {
    res.render("home");
  });
});


app.get("/twitteranalysis", (req, res) => {
  cors(req, res, async () => {
    res.render("twitter");
  });
});


app.get("/analyze", (req, res) => {
  cors(req, res, async () => {
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
    )
  });
});


app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Server started!!");
});
