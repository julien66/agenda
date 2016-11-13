/**
 * @file
 * Navbar controller for the calendar
 */
define(["jquery", "views/navbar", "controllers/calendar-day", "controllers/calendar-week", "controllers/calendar-month", "models/agenda", "controllers/resa", "css!styles/navbar", "datejs"], function($, navbarView, calendarDay, calendarWeek, calendarMonth, agendaModel, resaController) {
  var date;
  var mode;

  function start(viewMode) {
    var defaut = "week";
    date = new Date();
    mode = viewMode || defaut;
    $("#" + defaut + "-bt").addClass("active");
    refreshAll();
  }

  function rebuildList(list) {
    if (list) {
      $("#group-agenda").fadeIn();
      navbarView.render(list);
    }
    else {
      $("#group-agenda").fadeOut();
      navbarView.render();
    }
  }

  function refreshAll() {
    var agenda = agendaModel.getAgenda();
    var colonne = Array(1);
    if (agenda) {
      colonne = range(agenda.colonne);
    }
    switch (mode) {
      case "day" :
        var bound = calendarDay.start(date, colonne);
      break;
      case "week" :
        var bound = calendarWeek.start(date, colonne);
      break;
      case "month" :
        var bound = calendarMonth.start(date, colonne);
      break;
    }
    navbarView.updateTimeShown(bound, mode);
    $(".resa").remove();
    var resas = resaController.get({ 
      agenda : agenda,
      bound  : {
        start : Math.floor(bound.start.getTime() / 1000),
        end : Math.ceil(bound.end.getTime() / 1000),
      }
    });
  }

  function range(j) {
    var array = [];
    for (var i = 1; i <= j; i++) {
      array.push({
        'num' : i,
        'end' : (j == i) ? true : false,
      });
    }
    return array;
  }

  $("#prev").click(function() {
    switch (mode) {
      case "day" :
        date.addDays(-1);
      break;
      case "week" :
        date.addDays(-7);
      break;
      case "month" :
        date.addMonths(-1);
      break;
    }
    refreshAll();
  });

  $("#next").click(function() {
    switch (mode) {
      case "day" :
        date.addDays(+1);
      break;
      case "week" :
        date.addDays(+7);
      break;
      case "month" :
        date.addMonths(+1);
      break;
    }
    refreshAll();
  });
  
  $("#today").click(function() {
    date = new Date();
    refreshAll();
  });
  
  $("#day-bt").click(function() {
    mode = "day";
    $(".ctrl").removeClass("active");
    $("#day-bt").addClass("active");
    refreshAll();
  });
  
  $("#week-bt").click(function() {
    mode = "week";
    $(".ctrl").removeClass("active");
    $("#week-bt").addClass("active");
    refreshAll();
  });
  
  $("#month-bt").click(function() {
    mode = "month";
    $(".ctrl").removeClass("active");
    $("#month-bt").addClass("active");
    refreshAll();
  });
  
  $("#group-agenda").on('change', function() {
    agendaModel.switchAgenda($(this).find(":selected").val());
    refreshAll();
  });

  // Ready to go to a given day view.
  window.addEventListener('goToDay', function(e) {
    mode = 'day';
    $(".ctrl").removeClass("active");
    $("#day-bt").addClass("active");
    date = Date.parse(e.detail.day);
    refreshAll();
  });
  
  window.addEventListener('agendaChange', function(e) {
    start(date);  
  });
  
  window.addEventListener('refreshResa', function(e) {
    refreshAll();
  });

  window.addEventListener('resaLoaded', function(e) {
   var resas = e.detail.resa;
   switch (mode) {
      case "day" :
        calendarDay.showResa(resas);
      break;
      case "week" :
        calendarWeek.showResa(resas);
      break;
      case "month" :
        calendarMonth.showResa(resas);
      break;
    }
  });

  return {
    start : start,
    refresh : refreshAll,
    rebuildList : rebuildList,
  }
});
