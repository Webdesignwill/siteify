
define([
  'Backbone',
  'require'
], function (Backbone, siteify_require) {

  "use strict";

  var Siteify = Backbone.Model.extend({

    defaults : {
      id: null,
      owner: false,
      setup: false,
      sitename: null,
      page : null,
      homepage : null
    },

    urls : {
      hello : '/api/siteify/hello',
      setup : '/api/siteify/setup',
      owner : '/api/siteify/owner'
    },

    $broker : $({}),

    initialize : function () {
      var to;
      this.listenTo(this, 'change', function (siteify) {
        for(var key in siteify.changed) {
          to = typeof siteify.changed[key] !== 'object' ? ' to : ' + siteify.changed[key] + ' ' : ' ';
          console.log('%c Siteify changed ' + key + to, 'background: #222222; color: #00feff;');
        }
      }, this);
    },

    loader : function (data, status) {

      var self = this;

      function go () {

        Backbone.history.start();

        if(self.get('owner')) {
          if(!self.get('setup')) {
            self.Router.navigate('/siteify/setup/site', {trigger:true});
          } else if (!self.get('homepage')) {
            self.Router.navigate('/siteify/setup/homepage', {trigger:true});
          } else {
            self.Sitemap.getAllPages(function (result, data, status) {
              if(!result) { return alert('Something went wrong loading the sitemap');}

              if('/' + Backbone.history.fragment === self.Sitemap.getHomepage().get('path')) {
                Backbone.history.loadUrl(Backbone.history.fragment);
              } else {
                self.Router.navigate(self.Sitemap.getHomepage().get('path'), {trigger:true});
              }

            });
          }
        } else {
          self.Router.navigate('/siteify/setup/owner', {trigger:true});
        }
      }

      function getOauth2 () {
        siteify_require(['Oauth2Model'], function (Oauth2Model) {
          self.Oauth2 = new Oauth2Model();
          getUser();
        });
      }

      function getUser () {
        siteify_require(['UserModel'], function (UserModel) {
          self.User = new UserModel();
          getBodyView();
        });
      }

      function getBodyView () {
        siteify_require(['BodyView'], function (BodyView) {
          getForms();
        });
      }

      function getForms () {
        siteify_require(['forms'], function (config) {
          function load () {
            req(['Forms'], function (Forms) {
              self.Forms = Forms;
              getRouter();
            });
          }
          var req = window.require(config(), load);
        });
      }

      function getRouter () {
        siteify_require(['Router'], function (Router) {
          self.Router = new Router();
          go();
        });
      }

      siteify_require(['Sitemap'], function (Sitemap) {
        self.Sitemap = new Sitemap();
        getOauth2();
      });

    },

    init : function () {
      var self = this;
      this.hello();
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
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
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
          this.loader();
        },
        error : function (data, status) {
          alert('Something went wrong saying hello');
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
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    }

  });

  return new Siteify();

});