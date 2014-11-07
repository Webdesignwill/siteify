
define([
  'App'
],

function (App) {

  "use strict";

  var SiteifyModel = Backbone.Model.extend({

    defaults : {
      status : null,
      page : null
    },

    urls : {
      hello : '/api/siteify/hello'
    },

    initialize : function () {
      this.listenTo(this, 'change:status', function (model, event) {
        console.log('%c App status is ' + event + ' ', 'background: #444f64; color: #FFFFFF');
      });
      this.listenTo(this, 'change:page', function (model, event) {
        console.log('%c Page changed to ' + event + ' ', 'background: #444f64; color: #FFFFFF');
      });
    },

    hello : function (done) {
      $.ajax({
        type : 'GET',
        context : this,
        url : this.urls.hello,
        contentType : 'application/x-www-form-urlencoded',
        success : function (data, status) {
          this.set(data);
          done(true, data, status);
        },
        error : function (data, status) {
          alert("Siteify isn't available");
        }
      });
    }

  });

  return new SiteifyModel();

});
