/**
 * @file
 * day view for the calendar.
 */
define(["jquery", "stache!templates/day", "css!styles/day"], function($, day) {
  function render(formatDate, times, isToday, date, colonne) {
    $("#grid").html(day({
      date : formatDate,
      day : date.toString("d/M/yyyy"),
      times : times,
      colonne : colonne,
    }));
    
    $("#red-marker").css({
      "height" : "0px",
    });

    if (isToday) {
      // Today is within this week. Let's enlight it !
      var dateSelect = date.toString("d/M/yyyy");
      $("td[day='" + dateSelect + "']").addClass("today"); 
      //$("#times tr td:nth-child(2)").addClass("today");
      // Red mark on the current time. And Scroll to it
      var dayMinutes =(Number(date.toString("H")) * 60) + Number(date.toString("mm"));
      
      var unitHeight = $("#times").height() / (24 * 4); 
      var topPosition = (dayMinutes * unitHeight) / 15;
      var offsetTop = $("#times").offset().top;

      var offsetLeft = $(".hours").eq(0).outerWidth();
      var unitWidth = ($("#times").width() - offsetLeft);
      
      $("#red-marker").css({
        "top" : parseInt(topPosition + offsetTop),
        "left" : (offsetLeft) + ((isToday - 1) * unitWidth),
        "width" : unitWidth,
        "height" : "2px",
      });
      
      // I want to scroll in a way so that the red mark is on the middle of the screen
      var innerHeight = $(window).innerHeight();
      var cal = innerHeight - offsetTop;
      $("body").scrollTop(topPosition - (cal * 0.5));
    }
  }

  function show(resa) {
    console.log(resa);
  }

  return {
    render : render,
    show : show,
  }
});
