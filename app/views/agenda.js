/**
 * @file
 * Agenda view for the calendar.
 */
define(["jquery", "stache!templates/resa", "bootbox", "stache!templates/form/newResa", "views/resa", "datejs"], function($, resa, bootbox, newResaForm, resaView) {
  
  function show(param) { 
  }
 
  function startRequest() {
    $("body").append(resa({
      id : "tempo",
    }));
  }

  function endRequest(param) {
    console.log(param);
    $("#tempo").css({'pointer-events' : 'all'});
    var end =  add15(param.endDrag.e.attr('day') + " " + param.endDrag.e.attr('time'), 'd/M/yyyy - HH:mm:ss' );
    var modal = bootbox.dialog({
      message : newResaForm({
        listInstall : param.listInstall,
        listGroup : param.listGroup,
        dateBegin : param.startDrag.e.attr("day") + " - " + param.startDrag.e.attr("time") + ":00", 
        dateEnd : end,
        colonneBegin : param.startDrag.e.attr("colonne"),
        colonneEnd: param.endDrag.e.attr("colonne"),
      }),
      title : "Nouvelle Réservation",
      onEscape: function() {
        $("#tempo").remove();
      },
      buttons : [
        {
          label : "Confirmer",
          className: "btn btn-primary pull-left",
          callback :  function(result) {
            var form = modal.find(".form");
            var items = form.serializeArray();
            var data = {}
            for (var i = 0; i < items.length; i++) {
              data[items[i].name] = items[i].value
            }
            var event = new CustomEvent('resaForm', {
              detail : data,
            });
            window.dispatchEvent(event);
            $("#tempo").remove();
          },
        },
      ],
    }); 
  }

  function request(startDrag, endDrag) {
    var param = resaView.targetToPosition(startDrag, endDrag);
    $("#tempo").css(param);
  } 

  function add15(string, format) {
    return Date.parse(string).add(15).minutes().toString(format);
  }

  return {
    'show' : show,
    'request' : request,
    'startRequest' : startRequest,
    'endRequest' : endRequest,
  }
});
