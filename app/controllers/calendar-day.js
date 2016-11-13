/**
 * @file
 * Day controller for the calendar.
 */
define(["views/calendar-day", "helper"], function(dayView) {
  function start(date, colonne) { 
    var today = Date.today();
    isToday = false;
    if (today.equals(date.at("00:00"))) {
      isToday = true;
    }
    
    dayView.render(date.toString("dddd  d / M"), returnTimes(), isToday, date, colonne);
    return {
      start : date.at("00:00am"),
      end : date.at("23:59"),
    }
  }

  function showResa(resas) {
    for (var i = 0; i < resas.length; i++) {
      dayView.Show(resas[i]);
    }
  }

  return {
    start : start,
    showResa : showResa,
  }
});
