/**
 * @file
 * Agenda controllers for the calendar.
 */
define(["models/agenda", "views/agenda", "controllers/navbar", "controllers/resa", "jdrupal", "css!styles/agenda"], function(agendaModel, agendaView, navbar, resaController, drupal) {
  var isDown = false;
  var startDrag = false;
  var endDrag = false;
  var isValid = false;

  var param = {
    main : 29,
    lieu : 29,
    groupe : 30,
  }

  $('#grid').on('mousedown', function(e) {
    var target = $(e.target);
    startDrag = {
      e : target,
      day : target.attr("day"),
      time : target.attr("time"),
      colonne : target.attr("colonne"),
    }
    agendaView.startRequest();
    isDown = true;
  });

  $(document).mouseup(function() {
    if( isDown == true && isValid == true) { 
      var listInstall =  jQuery.extend(true, [], agendaModel.getList());
      var currentAgenda = agendaModel.getAgenda();
      for (var i = 0; i < listInstall.length; i++) {
        if (listInstall[i].id == currentAgenda.id) {
          listInstall[i].sel = true;
        }
      }
      agendaView.endRequest({
        listInstall : listInstall,
        currentAgenda : currentAgenda,
        listGroup : agendaModel.getSimpleGroup(),
        startDrag : startDrag,
        endDrag : endDrag,
      }); 
    }
    startDrag = false;
    isDown = false;
    isValid = false;
  })

  $(document).on('mousemove', function(e) {
    if(isDown == false) return;
    e.preventDefault();
    var target = $(e.target);
    if (!target.attr("day")) {
      return;
    }
    if(startDrag.day == target.attr("day")) {
      endDrag = {
        e : target,
      }
      agendaView.request(startDrag, endDrag); 
    }
    isValid = true;
  });
  
  window.addEventListener('userLogin', function(e) {
    var user = e.detail.user;
    get_agenda_param(user.uid, {
      'success' : function(data) {
        console.log(data);
        agendaModel.setList(data[0]);
        agendaModel.setAgenda(data[0][0]);
        agendaModel.setGroup(data[1]);
        navbar.rebuildList(data[0]);
        navbar.refresh();
      },
      'error' : function(xhr, status, message) {
        console.log(message);
        console.log(status);
      }
    }); 
  });

  window.addEventListener('userLogout', function(e) {
    navbar.rebuildList(false);
  });
  
  function get_agenda_param(uid, options) {
    // Build a system connect object.
    var get_agenda = {
      service: 'param',
      resource: 'find',
      method: 'GET',
      path: 'param/' + uid + '.json',
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
    Drupal.services.call(get_agenda);
  }

  /*function switchAgenda(ag) {
    var event = new CustomEvent('agendaChange', {
      'agenda' : ag,
    });
    window.dispatchEvent(event);
  }*/
});
