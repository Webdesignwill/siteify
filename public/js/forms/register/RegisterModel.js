
define([],

function () {

  "use strict";

  var RegisterModel = Backbone.Model.extend({

    urls : { email : '/api/user/unique', },

    validation : {
      email : [{
        required : true,
        msg : 'Please enter you email'
      },{
        pattern : 'email',
        msg : 'Please enter a valid email'
      },{
        unique : true,
        msg : 'This email is already registered'
      }],
      displayname : [{
        required : true,
        msg : 'Please provide a display name'
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

  return RegisterModel;

});
