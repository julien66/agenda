/**
 * @file
 * Calendar Controller module.
 */
define(["views/calendar-week","datejs", "helper"], function(weekView) {

  function start(date, colonne) {
    var days = [];
    
    var weekDate = date.clone();
    var today = Date.today();
    if (weekDate.is().monday()) {
      var first = weekDate;
    }
    else {
      var first = weekDate.previous().monday();
    }
    var startingDay = first.clone();
    var isToday = false;
    first.addDays(-1);
    for (var i = 0; i < 7; i++ ) {
      if (today.equals(first.at("00:00"))) {
        isToday = i;
      }
      days.push({
        name : first.addDays(1).toString("dddd d / M"),
        rel : first.toString("d/M/yyyy"),
      });
    }
    weekView.render(days, returnTimes(), isToday, date, colonne);
    return {
      start : startingDay.at("00:00am"),
      end : first.at("23:59"),
    }
  }
  
  function showResa(resas) {
    for (var i = 0; i < resas.length; i++) {
      weekView.show(resas[i]);
    }
  }
 
  return {
    start : start,
    showResa : showResa,
  }
});
