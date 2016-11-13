/**
 * @file
 * Week view for the calendar.
 */
define(["jquery", "stache!templates/week", "views/resa", "css!styles/week"], function($, week, viewResa) {

  function render(days, times, isToday, date, colonne) {
    $("#grid").html(week({
      days : days,
      times : times,
      colonne : colonne,
    }));
    
    $("#red-marker").css({
      "height" : "0px",
    });

    if (isToday) {
      // Today is within this week. Let's enlight it !
      var dateSelect = date.toString("d/M/yyyy");
      //$("#times tr td:nth-child(" + ((isToday + 1) * colonne[colonne.length - 1]['num'] ) + ")").addClass("today");
      $("td[day='" + dateSelect + "']").addClass("today"); 
      
      // Red mark on the current time. And Scroll to it
      var dayMinutes =(Number(date.toString("H")) * 60) + Number(date.toString("mm"));
      
      var unitHeight = $("#times").height() / (24 * 4); 
      var topPosition = (dayMinutes * unitHeight) / 15;
      var offsetTop = $("#times").offset().top;

      var offsetLeft = $(".hours").eq(0).outerWidth();
      var unitWidth = ($("#times").width() - offsetLeft) / 7;
      $("#red-marker").css({
        "top" : parseInt(topPosition + offsetTop),
        "left" : (offsetLeft - colonne.length) + ((isToday - 1) * unitWidth),
        "width" : unitWidth - (colonne.length),
        "height" : "2px",
      });
      
      // I want to scroll in a way so that the red mark is on the middle of the screen
      var innerHeight = $(window).innerHeight();
      var cal = innerHeight - offsetTop;
      $("body").scrollTop(topPosition - (cal * 0.5));
    }

    // Link to day view.
    $(".week-to-day").click(function() {
      var event = new CustomEvent('goToDay', {
        detail : {
          'day' : $(this).attr("rel"),
        }
      });
      window.dispatchEvent(event);
    });
  }

  function show(resa) {
    var day_start = new Date(resa['date_begin'] * 1000).toString("d/M/yyyy");
    var day_end_day = new Date(resa['date_end'] * 1000);
    var day_end_time = new Date(resa['date_end'] * 1000);
    var time_start = new Date(resa['date_begin'] * 1000).toString("HH:mm");
    //var time_end = new Date(resa['date_end'] * 1000).toString("HH:mm");
    var start = $("td[day='" + day_start + "'][time='" + time_start + "'][colonne='" + resa['colonne_debut']+ "']");
    var end = $("td[day='" + remove15(day_end_day, "d/M/yyyy") + "'][time='" + remove15(day_end_time, "HH:mm") + "'][colonne='" + resa['colonne_fin'] + "']");
    var param = {
      start : {e : start},
      end : {e : end},
      id : resa.id
    }
    viewResa.createBox(resa.id, resa.group);
    viewResa.updateBox('week', param);
  }

  function remove15(string, format) {
    return string.add(-15).minutes().toString(format);
  }

  return {
    render : render,
    show : show,
  }
});
