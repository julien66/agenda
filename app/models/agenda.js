/**
 * @file
 * Installation model for the calendar
 */
define(['jquery', 'models/resa'], function($, resaModel) {
  
  var list = [];
  var group = [];
  var simpleGroup = [];
  var agenda = {
    id : 0,
    name : "Unknown",
    colonne : 1,
  };

  function switchAgenda(nid) {
    var result = $.grep(list, function(e){ return e.id == nid;});
    setAgenda(result[0]);
  } 

  /*function changeAgenda() {
    var event = new CustomEvent('agendaChange', {
      'agenda' : agenda,
    });
    window.dispatchEvent(event);
  }*/ 

  function showResa(resa) {
  }

  function createResa(resa) {
  }

  function editResa(resa) {
  }
  
  function deleteResa(resa) {
  }

  function setAgenda(a) {
    agenda = a;
  }

  function getAgenda() {
    return agenda;
  }

  function setList(l) {
    list = l;
  }

  function getList() {
    return list;
  }
  
  function setGroup(g) {
    simpleGroup = g;
    for (var i = 0; i < g.length; i++) {
      group[g[i].id] = g[i];
    }
  }

  function getGroup() {
    return group;
  }

  function getSimpleGroup() {
    return simpleGroup;
  }

  return {
    getAgenda : getAgenda,
    setAgenda : setAgenda,
    getList : getList,
    setList : setList,
    getGroup : getGroup,
    getSimpleGroup : getSimpleGroup,
    setGroup : setGroup,
    switchAgenda : switchAgenda,
  }
});
