
define([],

function () {

  "use strict";

  var ProfileModel = Backbone.Model.extend({

    persist : true,

    validation : {
      displayname : [{
        required : false,
        msg : 'Please enter you display name'
      },{
        minLength : [3],
        msg : 'Your display name cant be less than 3 characters'
      }],
      company : [{
        required : false,
        msg : 'Please provide a company name'
      },{
        minLength : [3],
        msg : 'Your company name cant be less than 3 characters'
      }],
      firstname : [{
        required : false,
        msg : 'Please enter your first name'
      },{
        minLength : [2],
        msg : 'Your first name cant be less than 2 characters'
      }],
      lastname : [{
        required : false,
        msg : 'Please enter your last name'
      },{
        minLength : [2],
        msg : 'Your last name cant be less than 2 characters'
      }]
    }
  });

  return ProfileModel;

});
