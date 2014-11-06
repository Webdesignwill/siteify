
define([
  'App'
],

function (App) {

  "use strict";

  var SiteifyModel = Backbone.Model.extend({

    defaults : { showSetup : false },

    urls : {
      hello : '/api/siteify/hello'
    },

    initialize : function () {},

    hello : function (done) {
      $.ajax({
        type : 'GET',
        context : this,
        url : this.urls.hello,
        contentType : 'application/x-www-form-urlencoded',
        success : function (data, status) {
          done(true, data, status);
        },
        error : function (data, status) {
          alert("Siteify isn't available");
        }
      });
    },

    register : function (user, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.register,
        contentType : 'application/x-www-form-urlencoded',
        data : user,
        success : function (data, status) {
          this.set(data);
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    },

    getProfile : function (done) {},
    put : function (user, done) {},

  });

  return new SiteifyModel();

});
