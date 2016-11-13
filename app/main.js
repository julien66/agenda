// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery", "controllers/navbar", "controllers/login", "controllers/agenda", "css!styles/layout", "css!styles/header", "css!components/bootstrap/dist/css/bootstrap"], function($, navbar, login, agenda) {
  navbar.start();
  
  $(window).resize(function () {
    navbar.refresh();
  });

});
