require.config({
  shim : {
    "bootstrap" : { "deps" :['jquery'] },
    "bootbox" : { "deps" :['bootstrap'] },
  },
  // make components more sensible
  // expose jquery 
  paths: {
    "bootbox" : "../bower_components/bootbox.js/bootbox",
    "bootstrap" : "../bower_components/bootstrap/dist/js/bootstrap",
    "components" : "../bower_components",
    "controllers" : "controllers",
    "css" : "../bower_components/require-css/css",
    "datejs" : "../bower_components/DateJS/build/date-fr-FR",
    "jdrupal" : "../lib/jdrupal-7.x-1.3",
    "jquery": "../bower_components/jquery/dist/jquery",
    "jscookie" : "../bower_components/js-cookie/js.cookie",
    "models" : "models", 
    "mustache" : "../bower_components/mustache.js/mustache",
    "stache" : "../bower_components/requirejs-mustache/stache",
    "styles" : "css",
    "templates" : "templates",
    "text" : "../bower_components/text/text",
    "views" : "views",
  },
  urlArgs : "bust=" + new Date().getTime(),

});

require.onResourceLoad = function (context, map, depMaps) {
  if (!window.rtree) {
    window.rtree = {};
    window.rtree.tree = {};
    window.rtree.map = function() {
      var dep, key, rt, val, _i, _len, _ref;
      rt = rtree.tree;
      for (key in rt) {
        val = rt[key];
        if (rt.hasOwnProperty(key)) {
          _ref = val.deps;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            dep = _ref[_i];
            val.map[dep] = rt[dep];
          }
        }
      }
    };
    
    window.rtree.toUml = function() {
      var dep, key, rt, uml, val, _i, _len, _ref;
      rt = rtree.tree;
      uml = [];
      for (key in rt) {
        val = rt[key];
        if (rt.hasOwnProperty(key)) {
          _ref = val.deps;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            dep = _ref[_i];
            uml.push("[" + key + "]->[" + dep + "]");
          }
        }
      }
      return uml.join("\n");
    };
  }
  
  r = window.rtree.tree;
  o = {deps: [], map: {}};
  if (!r[map.name]) {
    r[map.name] = o;
  }
  
  if (map.parentMap && map.parentMap.name) {
    if (!r[map.parentMap.name]) {
      r[map.parentMap.name] = o;
    }
    if (map.parentMap.name !== map.name) {
      r[map.parentMap.name].deps.push(map.name);
    }
  }
};

if (!window.requireTestMode) {
  require(['main'], function(){ });
}
