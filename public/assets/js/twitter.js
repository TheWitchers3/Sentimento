console.log("connected");
var slider = document.getElementById("tweetsrange");
var output = document.getElementById("numoftwtsinput");
var toppostweetstab = document.getElementById("nav-toppostweets");
var topnegtweetstab = document.getElementById("nav-topnegtweets");
var rumordetectiontab = document.getElementById("nav-rumordetection");
var topTopics=document.getElementById("topTopics");
var searchtrend = document.getElementById("searchtrend");

$.getJSON("http://127.0.0.1:5000/getTrending",function(data) {
  
  data=data[0];
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
  id=searchtrend.id;
  searchtrend=$('#'+id).text();
  fetch("/analyze?searchtrend=" + searchtrend)
    .then(response => response.json())
    .then(jsondata => {
      console.log(jsondata);
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var ptp = jsondata.pp + 0.5 * jsondata.neup;
        var ntp = jsondata.np + 0.5 * jsondata.neup;
        var data = google.visualization.arrayToDataTable([
          ["Senitment Analysis", "%tage"],
          ["Positive", parseInt(ptp)],
          ["Negative", parseInt(ntp)]
        ]);

        var options = { title: "Sentiments", width: 600, height: 400 ,colors: ['#065e23','#cf2a2a']};

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
        if(tempt.substring(0,2)==="RT"){
          tempt = tempt.substring(3);
        }
        postweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      toppostweetstab.innerHTML = postweets;
      for (var i = 0; i < jsondata.negativeTweets.length; i++) {
        tempt = jsondata.negativeTweets[i].text;
        if(tempt.substring(0,2)==="RT"){
          tempt = tempt.substring(3);
        }
        negtweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      topnegtweetstab.innerHTML = negtweets;

      //for rumor analysis

      isRumor=jsondata.truthfulness;
      phrasesUsed=jsondata.intersection;
      console.log(phrasesUsed);
      var tempt;

      var rumorAnalysis="";

      if(isRumor) {
        rumorAnalysis+='The result of the rumor analysis is:<br>&emsp;<div style="color: #57c260d7;">TRUE <br>&emsp;The Tweets are true</div>';

      }
      else if(!isRumor) {
        rumorAnalysis+='The result of the rumor analysis is:<br>&emsp;<div style="color: #c52323d7;">FALSE <br>&emsp;The Tweets are false</div>   ';
      }

      rumorAnalysis+="<div><br><br>Phrases used for detection of rumor: <br><br>";

      for (var i = 0; i < phrasesUsed.length; i++) {
        tempt = phrasesUsed[i];
        if(tempt.substring(0,2)==="RT"){
          tempt = tempt.substring(3);
        }
        rumorAnalysis += "" + (i + 1) + ") " + tempt + "<br>";
      }
      rumorAnalysis+="</div>";

      

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
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var ptp = jsondata.pp + 0.5 * jsondata.neup;
        var ntp = jsondata.np + 0.5 * jsondata.neup;
        var data = google.visualization.arrayToDataTable([
          ["Senitment Analysis", "%tage"],
          ["Positive", parseInt(ptp)],
          ["Negative", parseInt(ntp)]
        ]);

        var options = { title: "Sentiments" ,colors: ['#065e23','#cf2a2a'], backgroundColor: {fill: '#bad4e0b', opacity: 100}};

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
        if(tempt.substring(0,2)==="RT"){
          tempt = tempt.substring(3);
        }
        postweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      toppostweetstab.innerHTML = postweets;
      for (var i = 0; i < jsondata.negativeTweets.length; i++) {
        tempt = jsondata.negativeTweets[i].text;
        if(tempt.substring(0,2)==="RT"){
          tempt = tempt.substring(3);
        }
        negtweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      topnegtweetstab.innerHTML = negtweets;

      //for rumor analysis

      isRumor=jsondata.truthfulness;
      phrasesUsed=jsondata.intersection;
      console.log(phrasesUsed);
      var tempt;
      var rumorAnalysis="";

      if(isRumor) {
        rumorAnalysis+='The result of the rumor analysis is:<br>&emsp;<div style="color: #57c260d7;">TRUE <br>&emsp;The Tweets are true</div>';

      }
      else if(!isRumor) {
        rumorAnalysis+='The result of the rumor analysis is:<br>&emsp;<div style="color: #c52323d7;">FALSE <br>&emsp;The Tweets are false</div>';
      }

      rumorAnalysis+='<div style="color: #000000"><br><br>Phrases used for detection of rumor: <br><br>';

      for (var i = 0; i < phrasesUsed.length; i++) {
        tempt = phrasesUsed[i];
        if(tempt.substring(0,2)==="RT"){
          tempt = tempt.substring(3);
        }
        rumorAnalysis += "" + (i + 1) + ") " + tempt + "<br>";
      }
      rumorAnalysis+="</div>";

      rumordetectiontab.innerHTML = rumorAnalysis;

      return;
    });
  return false;
}

document.onreadystatechange = function() {
  var state = document.readyState;
  if (state == "complete") {
    setTimeout(function() {
      document.getElementById("interactive");
      document.getElementById("load").style.visibility = "hidden";
    }, 1500);
  }
};
