/**
 * @file
 * Reservation model for the app.
 */
define(['jdrupal'], function (drupal) {
  var resas = [];

  function create(node) {
    node_save(node, {
      success: function(result) {
        var event = new CustomEvent('refreshResa', {
          detail : {
            'id' : result.nid,
          }
        });
        window.dispatchEvent(event);
      }
    });
  }

  function erase(nid) { 
    node_delete(nid, {
      success: function(result) {
        if (result[0]) {
          refresh(nid);
        }
      }
    });
  }

  function refresh(result) { 
    var event = new CustomEvent('refreshResa', {
      detail : {
        'id' : result.nid,
      }
    });
    window.dispatchEvent(event);
  }

  function setResa(r) {
    resas = r
  }

  function find(time) {
    for (var i = 0; i < resas.length; i++) {
      console.log(resas[i]['date_begin'], time, resas[i]['date_end']);
      if ((resas[i]['date_begin'] * 1000) <= time && (resas[i]['date_end'] * 1000) >= time) {
        return resas[i];
      }
    }
    return false;
  }

  return {
    setResa : setResa,
    create : create,
    erase : erase,
    find : find,
  }
});
