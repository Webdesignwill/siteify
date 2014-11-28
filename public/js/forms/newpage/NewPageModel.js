
define([],

function () {

  "use strict";

  var NewPage = Backbone.Model.extend({

    validation : {
      title : [{
        required : true,
        msg : 'Your gonna need a page title'
      }]
    }
  });

  return NewPage;

});