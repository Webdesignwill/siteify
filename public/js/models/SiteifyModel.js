
define(['App'],

function (App) {

  "use strict";

  var SiteifyModel = Backbone.Model.extend({

    defaults : {
      sitename : null,
      status : null,
      page : null /* Not meant to be here */
    },

    urls : {
      hello : '/api/siteify/hello',
      setup : '/api/siteify/setup'
    },

    initialize : function () {
      this.listenTo(this, 'change:status', function (model, status) {
        console.log('%c App status is ' + status + ' ', 'background: #444f64; color: #FFFFFF');
      });
      this.listenTo(this, 'change:page', function (model, page) {
        console.log('Page change : ', page);
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
    },

    setup : function (data, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.setup,
        contentType : 'application/x-www-form-urlencoded',
        data : data,
        success : function (data, status) {
          this.set(data);
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    }

  });

  return new SiteifyModel();

});
