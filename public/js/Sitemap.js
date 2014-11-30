
define([
  'PageModel',
  'SiteifyModel'
],

function (PageModel, SiteifyModel) {

  "use strict";

  var Sitemap = Backbone.Collection.extend({

    url : '/api/pages/all',
    urls : {
      new : '/api/pages/new'
    },

    model : PageModel,

    initialize : function () {
      this.listenTo(this, 'add', function (page) {
        console.log('%c Page ' + page.get('title') + ' added ', 'background: #222222; color: #00FF00;');
      }, this);
      this.listenTo(this, 'remove', function (page) {
        console.log('%c Page ' + page.get('title') + ' removed ', 'background: #222222; color: #FF0000;');
      }, this);
    },

    parse : function (models) {
      return models;
    },

    getHomepage : function () {
      return this.get(SiteifyModel.get('homepageid'));
    },

    getSitemap : function (done) {
      var self = this;
      this.fetch({
        success : function (data, status) {
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    },

    newPage : function (page, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.new,
        contentType : 'application/x-www-form-urlencoded',
        data : page,
        success : function (data, status) {
          this.set(data, {
            parse:true,
            remove:false,
            merge:true
          });
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    }

  });

  return Sitemap;

});