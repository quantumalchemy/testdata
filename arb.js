$.getJSON("https://github.com/quantumalchemy/testdata/blob/main/api.the-odds-api.com.json", function(data) {
  // Loop through each event in the JSON data
  for (var i = 0; i < data.length; i++) {
    var event = data[i];

    // Loop through each bookmaker's odds for this event
    var total = 0;
    var bookmakerNames = [];
    var bookmakerOdds = [];
    var bookmakerTeam = [];
    for (var j = 0; j < event.bookmakers.length; j++) {
      var bookmaker = event.bookmakers[j];
      for (var k = 0; k < bookmaker.markets.length; k++) {
        var market = bookmaker.markets[k];

        for (var l = 0; l < market.outcomes.length; l++) {
          var outcome = market.outcomes[l];
          var odds_team = outcome.name;
          var odds = parseFloat(outcome.price);


          // Skip any bookmakers with odds of 0
          if (odds === 0) {
            continue;
          }

          total += (1 / odds);
          bookmakerNames.push(bookmaker.title);
          bookmakerTeam.push(odds_team);
          bookmakerOdds.push(odds);
        }
      }
    }

    // Calculate the implied probabilities and arbitrage opportunity
    var impliedProbabilities = [];
    var arbOpportunity = 1 - (1 / total);
    for (var j = 0; j < bookmakerOdds.length; j++) {
      var impliedProbability = bookmakerOdds[j] / total;
      impliedProbabilities.push(impliedProbability);
    }

    // Output the results to the console
    console.log("Event:  home_team: " + event.home_team + "VS  away_team: ",  event.away_team);
   var x = 0;
    for (var j = 0; j < bookmakerNames.length; j++) {
		console.log(" Bookie: " + bookmakerNames[j]);
        console.log(" Team: " + bookmakerTeam[j]);
      console.log("  Price: " + bookmakerOdds[j]);
      console.log("  Probability: " + (impliedProbabilities[j] * 100).toFixed(2) + "%");
      
    }
    console.log("- Arbitrage opportunity: " + (arbOpportunity * 100).toFixed(2) + "%");
  }
});

