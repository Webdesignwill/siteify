
define([],

function () {

  "use strict";

  var LoginModel = Backbone.Model.extend({

    validation : {
      email : [{
        required : true,
        msg : 'Please enter you email'
      },{
        pattern : 'email',
        msg : 'Please enter a valid email'
      }],
      password : [{
        required : true,
        msg : 'Please enter your password'
      }]
    }
  });
  return LoginModel;
});
