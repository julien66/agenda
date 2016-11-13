/**
 * @file
 * Month controller for the calendar.
 */
define(['views/calendar-month'], function(viewMonth) {
  
  function start(date) {
    var weekName = [];
    var weeks = []; 
    var monthDate = date.clone();
    var today = Date.today();
    var first = monthDate.first().monday();
    if (Number(first.toString("d") !== 1)) {
      first.previous().monday();
    }
    var startingDay = first.clone();
    var isToday = false;
    first.addDays(-1);
    for (var i = 0; i < 7; i++) {
      weekName.push({
        name : first.addDays(1).toString("dddd")
      });
    }
    
    first.addDays(-7);

    for (var j = 0; j < 5; j++) {
      var days = [];
      for (var i = 0; i < 7; i++ ) {
        if (today.equals(first.at("00:00"))) {
          isToday = i;
        }
        days.push({
          name : first.addDays(1).toString("dd"),
          rel : first.toString ("d/M/yyyy"),
          today : isToday,
        });
      }
      weeks[j] = {
        days :days,
      };
    }

    viewMonth.render(weekName, weeks, isToday);

    return {
      start : startingDay.at("00:00am"),
      end : first.at("23:59"),
    };
  } 

  function showResa(resas) {
    for (var i = 0; i < resas.length; i++) {
      viewMonth.show(resas[i]);
    }
  }

  return {
    start : start,
    showResa : showResa,
  }
});
