/**
 * @file
 * Login view for the calendar
 */
define(["jquery", "bootbox", "stache!templates/login"], function($, bootbox, loginForm) {
 
  function change(user) {
    if (user) {
      $("#login-bt").html("Bonjour " + user.name + " - Se déconnecter");
    }
    else {
      $("#login-bt").html("Login");
    }
  }

  function login(result) { 
  };

  function call() {
    var modal = bootbox.dialog({
      message : loginForm({}),
      title : "Connexion",
      buttons : [
        {
          label : "Envoyer",
          className: "btn btn-primary pull-left",
          callback :  function(result) {
            var form = modal.find(".form");
            var items = form.serializeArray();
            console.log(items);
            var event = new CustomEvent('loginForm', {
              detail : {
                'login' : items[0].value,
                'password' : items[1].value,
              }
            });
            window.dispatchEvent(event);
          },
        },
        {
          label : "Demander un accès",
          className: "btn btn-default pull-left",
          callback : function () {
            var form = modal.find(".form");
            var items = JSON.stringify(form.serializeArray()); 
            console.log(items);
          }
        },
      ],
    });
  }
  

  return {
    call : call,
    change : change,
  }
});
