
define(['App'],

function (App) {

  "use strict";

  var SiteifyModel = Backbone.Model.extend({

    defaults : {
      id: null,
      owner: false,
      setup: false,
      sitename: null,
      status: "setup",
      page : null /* Not meant to be here */
    },

    urls : {
      hello : '/api/siteify/hello',
      setup : '/api/siteify/setup',
      owner : '/api/siteify/owner'
    },

    initialize : function () {
      var to;
      this.listenTo(this, 'change', function (siteify) {
        for(var key in siteify.changed) {
          to = typeof siteify.changed[key] !== 'object' ? ' to : ' + siteify.changed[key] : ' ';
          console.log('%c Siteify changed ' + key + to, 'background: #00feff; color: #222222;');
        }
      }, this);
    },

    registerOwner : function (user, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.owner,
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
