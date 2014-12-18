
define([
  'Siteify',
  'PageModel',
  'SiteifyLive'
],

function (Siteify, PageModel, SiteifyLive) {

  "use strict";

  var Sitemap = Backbone.Collection.extend({

    url : '/api/pages/all',
    urls : {
      new : '/api/pages/new',
      delete : '/api/pages/delete'
    },

    model : PageModel,

    initialize : function () {
      this.listenTo(this, 'add', function (page) {
        console.log('%c Page ' + page.get('title') + ' added ', 'background: #222222; color: #00FF00;');
      }, this);
      this.listenTo(this, 'remove', function (page) {
        console.log('%c Page ' + page.get('title') + ' removed ', 'background: #222222; color: #FF0000;');
      }, this);

      this.setSiteifyLive();

    },

    setSiteifyLive : function () {
      var self = this;
      SiteifyLive.register({
        room : '/pages',
        events : {
          'page:added' : function pageAdded (page) {
            self.addNewPage(page);
          },
          'page:removed' : function pageRemoved (page) {
            self.removePage(page);
          }
        }
      });
    },

    parse : function (models) {
      return models;
    },

    getHomepage : function () {
      return this.get(Siteify.get('homepageid'));
    },

    getAllPages : function (done) {
      $.ajax({
        type : 'GET',
        context : this,
        url : this.url,
        contentType : 'application/x-www-form-urlencoded',
        success : function (data, status) {
          this.set(data, {parse:true});
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    newPage : function (page, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.new,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Siteify.Oauth2.get('access_token')
        },
        data : page,
        success : function (data, status) {
          this.addNewPage(data);

          SiteifyLive.emit({
            room : '/pages',
            event : 'page:added',
            data : data
          });

          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    addNewPage : function (page) {
      if(page.homepage) {
        Siteify.set('homepageid', page._id);
      }

      this.set(page, {
        parse:true,
        remove:false,
        merge:true
      });
    },

    delete : function (page, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.delete,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Siteify.Oauth2.get('access_token')
        },
        data : {pageid : page.id},
        success : function (data, status) {
          this.removePage(data);

          SiteifyLive.emit({
            room : '/pages',
            event : 'page:removed',
            data : data
          });

          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    removePage : function (page) {
      this.remove(page._id);
    }

  });

  return Sitemap;

});