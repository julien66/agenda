/**
 * @file
 * Month view for the calendar.
 */
define(["jquery", "stache!templates/month", "css!styles/month"], function($, month) {
  
  function render(weekName, weeks, isToday) {
    $("#grid").html(month({
      weekName : weekName,
      weeks : weeks,
    }));

    // Arrange full page table
    var innerHeight = $(window).innerHeight();
    var offsetTop = $("#month").offset().top;
    var innerOffset = $("#month tr:nth-child(0)").height();
    var cellHeight = Math.round((innerHeight - offsetTop + innerOffset) / 5);
    $("#month td").css({
      height : cellHeight,
    });
    
    $(".month-to-day").click(function() {
      var event = new CustomEvent('goToDay', {
        detail : {
          'day' : $(this).attr("rel"),
        }
      });
      window.dispatchEvent(event);
    });
  }
  
  function show(resa) {
    console.log(resa);
  }
  
  return {
    render : render,
    show : show,
  }
});
