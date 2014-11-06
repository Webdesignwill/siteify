
define([],

function () {

  "use strict";

  var SetupModel = Backbone.Model.extend({

    validation : {
      sitename : [{
        required : true,
        msg : 'What\'s the name of your site?'
      }],
      displayname : [{
        required : true,
        msg : 'Please provide a display name'
      }],
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
      },{
        rangeLength : [5, 14],
        msg : 'Your password must be between 5 and 14 characters'
      }],
      confirmpassword : [{
        required : true,
        msg : 'Please re enter your password'
      },{
        equalTo : 'password',
        msg : 'This should match your password'
      }]
    }
  });

  return SetupModel;

});
