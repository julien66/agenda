/**
 * @file
 * Reservation controller module for the calendar.
 */
define(['jquery', 'models/resa', 'models/agenda', 'bootbox', 'datejs', 'jdrupal', 'datejs'], function($, resaModel, agendaModel, bootbox) {
  
  function get_all_resa (param, options) {
    var get_resa = {
      service: 'param',
      resource: 'find',
      method: 'POST',
      path: 'param/find.json',
      data: JSON.stringify({'param' : param}),
      success: function(data) {
        try {
          if (options.success) { options.success(data); }
        }
        catch (error) { console.log('get_agenda - success - ' + error); }
      },
      error: function(xhr, status, message) {
        try {
          if (options.error) { options.error(xhr, status, message); }
        }
        catch (error) { console.log('get_agenda - error - ' + error); }
      }
    };
    Drupal.services.call(get_resa);
  }

  function get(param) {
    get_all_resa(param, {
      'success' : function(data) {
        var group = agendaModel.getGroup();
        for (var i = 0; i < data.length; i++) {
          data[i]['group'] = group[data[i].groupe];
        }
        resaModel.setResa(data);
        var event = new CustomEvent('resaLoaded', {
          detail : {
            'resa' : data,
          }
        });
        window.dispatchEvent(event);
      },
      'error' : function(xhr, status, message) {
        console.log(message);
        console.log(status);
      },
    });
  }

  window.addEventListener('resaForm', function(e) {
    var data = e.detail;
    console.log(data);
    var node = {
      title : "resa",
      type: "reservation",
      'field_date' : {
        'und' : [{
          'value' : {'date' : data['date-begin']},
          'value2' : {'date' : data['date-end']},
        }],
      },
      'field_installation' : {
        'und' : [{
          'target_id' : data.installation,
        }],
      },
      'field_groupe' : {
        'und' : [{
          'target_id' :  data.groupe,
        }],
      },
      'field_colonne_debut' : {
        'und' : [{
          'value' : data['colonne-begin'],
        }],
      },
      'field_colonne_fin' : {
        'und' : [{
          'value' : data['colonne-end'],
        }],
      },
    };

    resaModel.create(node); 
  });

  $(document).on("dblclick", function(e) {
    var day = $(e.target).attr('day');
    var time = $(e.target).attr('time');
    if (day && time) { 
      var resa = resaModel.find(Date.parse(day + " " + time).getTime());
      if (!resa) {
        return;
      }
      bootbox.setLocale('fr');
      bootbox.confirm({
        message : "Vous êtes sur le point d'effacer cette réservation ?",
        callback : function(result) {
          if (result) {
            resaModel.erase(resa.id);
          }
        }
      });
    }
  });

  return {
    get : get,
  }
});
