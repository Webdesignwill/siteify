
define([],

function () {

  "use strict";

  var SetupModel = Backbone.Model.extend({

    validation : {
      sitename : [{
        required : true,
        msg : 'What\'s the name of your site?'
      }]
    }
  });

  return SetupModel;

});
