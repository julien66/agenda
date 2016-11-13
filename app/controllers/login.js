/**
 * @file
 * Login Controller for the calendar
 */
define(["jquery", "views/login", "jdrupal"], function($, logView, drupal) {

  // Set the site path (without the trailing slash).
  Drupal.settings.site_path = "http://37.59.55.69";
  // Set the Service Resource endpoint path.
  Drupal.settings.endpoint = "agenda";
  
  var connect = false; 
  system_connect({
    success: function(result) {
      try {
        login(result);
      }
      catch (error) {
        console.log('user_login - system_connect - success - ' + error);
      }
    },
    error: function(xhr, status, message) {
      try {
      }
      catch (error) {
        console.log('user_login - system_connect - error - ' + error);
      }
    }
  });

  $("#login-bt").click(function() {
    if (!connect) {
      logView.call();
    }
    else {
      user_logout({
        success : function(result) {
          connect = false;
          logView.change(false);
          var event = new CustomEvent('userLogout');
          window.dispatchEvent(event);
        },
        error : function(result) {
          console.log(error);
        },
      });
    }
  });
  
  // At Login Event.
  function login(param) {
    var user = param.user;
    if (user.uid > 0) {
      connect = true;
      logView.change(user);
      var event = new CustomEvent('userLogin', {
        detail : {
          'user' : user,
        }
      });
      window.dispatchEvent(event);
    }
  }

  window.addEventListener('loginForm', function(e) {
    user_login(e.detail.login, e.detail.password, {
      success : function(result) { 
        login(result);
      },
      error : function(xhr, status, message){
        console.log(message);
      }
    });
  });

});
