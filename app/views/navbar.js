/**
 * @file
 * Navbar views for the calendar
 */
define(["jquery", "stache!templates/time-show", "stache!templates/select-instal", "datejs"], function($, timeShow, selectInstal) {
  function render(list) {
    $("#group-agenda").html(selectInstal({
      list : list,
    }))
  }

  function updateTimeShown(bound, mode) {
    switch(mode) {
      case "day" :
        $("#time-show").html(timeShow({
          date : bound.start.toString('dddd, d MMM yyyy'),
        }));
      break;
      case "week" :
        //var weekNumber = date.getISOWeek();
        $("#time-show").html(timeShow({
          date : bound.start.toString("d MMM yyyy") + " - " + bound.end.toString("d MMM yyyy"),
        }));
      break;
      case "month" :
        $("#time-show").html(timeShow({
          date : bound.start.toString("d MMM yyyy") + " - " + bound.end.toString("d MMM yyyy"),
        }));
      break;
    }
  }

  return {
    updateTimeShown : updateTimeShown,
    render : render,
  }
});
