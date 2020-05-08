console.log("connected");
var toppostweetstab = document.getElementById("nav-toppostweets");
var topnegtweetstab = document.getElementById("nav-topnegtweets");
var rumordetectiontab = document.getElementById("nav-rumordetection");
var searchtrend = document.getElementById("searchtrend");

$.getJSON("https://twittersentimentanalyticsback.herokuapp.com/getTrending", function (data) {

  data = data[0];
  console.log(data);
  $('#1st').text(data[0].toString());
  $('#2nd').text(data[1].toString());
  $('#3rd').text(data[2].toString());
  $('#4th').text(data[3].toString());
  $('#5th').text(data[4].toString());
  $('#6th').text(data[5].toString());
  $('#7th').text(data[6].toString());
  $('#8th').text(data[7].toString());
  $('#9th').text(data[8].toString());
  $('#10th').text(data[9].toString());
  $('#11th').text(data[10].toString());
  $('#12th').text(data[11].toString());
  $('#13th').text(data[12].toString());
  $('#14th').text(data[13].toString());
  $('#15th').text(data[14].toString());
  $('#16th').text(data[15].toString());
  $('#17th').text(data[16].toString());
  $('#18th').text(data[17].toString());
  $('#19th').text(data[18].toString());
  $('#20th').text(data[19].toString());
});


function runAnalyzer(searchtrend) {
  id = searchtrend.id;
  searchtrend = $('#' + id).text();
  fetch("/analyze?searchtrend=" + searchtrend)
    .then(response => response.json())
    .then(jsondata => {
      console.log(jsondata);
      google.charts.load("current", {
        packages: ["corechart"]
      });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var ptp = jsondata.pp + 0.5 * jsondata.neup;
        var ntp = jsondata.np + 0.5 * jsondata.neup;
        var data = google.visualization.arrayToDataTable([
          ["Senitment Analysis", "%tage"],
          ["Positive", parseInt(ptp)],
          ["Negative", parseInt(ntp)]
        ]);

        var options = {
          title: "Sentiments",
          chartArea:{left:0,top:0,width:"100%",height:"100%"},
          width: 500,
          height: 400,
          colors: ['#70e070', '#fd3d3d']
        };

        var chart = new google.visualization.PieChart(
          document.getElementById("piechart")
        );
        chart.draw(data, options);
      }
      var postweets = "";
      var negtweets = "";
      var tempt;
      for (var i = 0; i < jsondata.positiveTweets.length; i++) {
        tempt = jsondata.positiveTweets[i].text;
        if (tempt.substring(0, 2) === "RT") {
          tempt = tempt.substring(3);
        }
        postweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      toppostweetstab.innerHTML = postweets;
      for (var i = 0; i < jsondata.negativeTweets.length; i++) {
        tempt = jsondata.negativeTweets[i].text;
        if (tempt.substring(0, 2) === "RT") {
          tempt = tempt.substring(3);
        }
        negtweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      topnegtweetstab.innerHTML = negtweets;

      //for rumor analysis

      isRumor = jsondata.truthfulness;
      phrasesUsed = jsondata.intersection;
      title = jsondata.title;
      console.log(phrasesUsed);
      var tempt;

      var rumorAnalysis = "";

      if (isRumor) {
        rumorAnalysis += 'The result of the rumor analysis is:<br>&emsp;<div style="color: #57c260d7;">TRUE <br>&emsp;The Tweets are true</div>';

      } else if (!isRumor) {
        rumorAnalysis += 'The result of the rumor analysis is:<br>&emsp;<div style="color: #c52323d7;">FALSE <br>&emsp;The Tweets are false</div>';
      }

      rumorAnalysis += '<div style="color: #000000; font-size:14px; "><br><br>Closest Related Headline: <br>&emsp;' + capitalizeFirstLetter(camelCase(title).replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")) + '<br></div>';

      rumorAnalysis += '<div style="color: #000000"><br><br>Phrases used for detection of rumor: <br><br>';

      for (var i = 0; i < phrasesUsed.length; i++) {
        tempt = phrasesUsed[i];
        if (tempt.substring(0, 2) === "RT") {
          tempt = tempt.substring(3);
        }
        rumorAnalysis += "" + (i + 1) + ") " + tempt + "<br>";
      }
      rumorAnalysis += "</div>";

      rumordetectiontab.innerHTML = rumorAnalysis;


      return;
    });
  return false;
}

function runAnalyzerForCustom() {

  fetch("/analyze?searchtrend=" + searchtrend.value)
    .then(response => response.json())
    .then(jsondata => {
      console.log(jsondata);
      google.charts.load("current", {
        packages: ["corechart"]
      });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var ptp = jsondata.pp + 0.5 * jsondata.neup;
        var ntp = jsondata.np + 0.5 * jsondata.neup;
        var data = google.visualization.arrayToDataTable([
          ["Senitment Analysis", "%tage"],
          ["Positive", parseInt(ptp)],
          ["Negative", parseInt(ntp)]
        ]);

        var options = {
          title: "Sentiments",
          chartArea:{left:0,top:0,width:"100%",height:"100%"},
          width: 500,
          height: 400,
          colors: ['#70e070', '#fd3d3d']
        };

        var chart = new google.visualization.PieChart(
          document.getElementById("piechart")
        );
        chart.draw(data, options);
      }
      var postweets = "";
      var negtweets = "";
      var tempt;
      for (var i = 0; i < jsondata.positiveTweets.length; i++) {
        tempt = jsondata.positiveTweets[i].text;
        if (tempt.substring(0, 2) === "RT") {
          tempt = tempt.substring(3);
        }
        postweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      toppostweetstab.innerHTML = postweets;
      for (var i = 0; i < jsondata.negativeTweets.length; i++) {
        tempt = jsondata.negativeTweets[i].text;
        if (tempt.substring(0, 2) === "RT") {
          tempt = tempt.substring(3);
        }
        negtweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      topnegtweetstab.innerHTML = negtweets;

      //for rumor analysis

      isRumor = jsondata.truthfulness;
      phrasesUsed = jsondata.intersection;
      title = jsondata.title;
      console.log(phrasesUsed);
      var tempt;
      var rumorAnalysis = "";

      if (isRumor) {
        rumorAnalysis += 'The result of the rumor analysis is:<br>&emsp;<div style="color: #57c260d7;">TRUE <br>&emsp;The Tweets are true</div>';

      } else if (!isRumor) {
        rumorAnalysis += 'The result of the rumor analysis is:<br>&emsp;<div style="color: #c52323d7;">FALSE <br>&emsp;The Tweets are false</div>';
      }

      rumorAnalysis += '<div style="color: #000000"; font-size:14px; "><br><br>Closest Related Headline: <br>&emsp;' + capitalizeFirstLetter(camelCase(title).replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")) + '<br></div>';

      rumorAnalysis += '<div style="color: #000000"><br><br>Phrases used for detection of rumor: <br><br>';

      for (var i = 0; i < phrasesUsed.length; i++) {
        tempt = phrasesUsed[i];
        if (tempt.substring(0, 2) === "RT") {
          tempt = tempt.substring(3);
        }
        rumorAnalysis += "" + (i + 1) + ") " + tempt + "<br>";
      }
      rumorAnalysis += "</div>";

      rumordetectiontab.innerHTML = rumorAnalysis;

      return;
    });
  return false;
}

document.onreadystatechange = function () {
  var state = document.readyState;
  if (state == "complete") {
    setTimeout(function () {
      document.getElementById("interactive");
      document.getElementById("load").style.visibility = "hidden";
    }, 1500);
  }
};


var interval = setInterval(function () {
  $.getJSON("https://twittersentimentanalyticsback.herokuapp.com/notif", function (data) {
    console.log(data);
    var keyword = data['notif'];

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    } else {
      var notification = new Notification('New Keyword just started trending!', {
        icon: 'public/assets/twitter.jpg',
        body: 'Hey, a new keyword: ' + keyword + ' is trending',
      });
      notification.onclick = function () {
        window.focus();
        $('#searchtrend').val(keyword);
        $('#submitbtn').click();
      };
    }
  });
}, 30000);


function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
