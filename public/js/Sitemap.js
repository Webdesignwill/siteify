
define([
  'PageModel',
  'SiteifyModel',
  'Oauth2Model',
  'io'
],

function (PageModel, SiteifyModel, Oauth2Model, io) {

  "use strict";

  var Sitemap = Backbone.Collection.extend({

    url : '/api/pages/all',
    urls : {
      new : '/api/pages/new',
      delete : '/api/pages/delete'
    },

    model : PageModel,

    initialize : function () {

      this.pages = io.connect('/pages');

      this.listenTo(this, 'add', function (page) {
        console.log('%c Page ' + page.get('title') + ' added ', 'background: #222222; color: #00FF00;');
      }, this);
      this.listenTo(this, 'remove', function (page) {
        console.log('%c Page ' + page.get('title') + ' removed ', 'background: #222222; color: #FF0000;');
      }, this);

      var self = this;
      this.pages.on('page:added', function (page) {
        self.addNewPage(page, false);
      });
      this.pages.on('page:deleted', function (page) {
        self.deletePage(page, false);
      });
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
        headers : {
          Authorization : 'Bearer ' + Oauth2Model.get('access_token')
        },
        data : page,
        success : function (data, status) {
          this.addNewPage(data, 'emit');
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    },

    addNewPage : function (page, emit) {
      if(page.homepage) {
        SiteifyModel.set('homepageid', page._id);
      }
      this.set(page, {
        parse:true,
        remove:false,
        merge:true
      });

      if(emit) {
        this.pages.emit('new:page', page);
      }
    },

    delete : function (page, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.delete,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Oauth2Model.get('access_token')
        },
        data : {pageid : page.id},
        success : function (data, status) {
          this.deletePage(data, 'emit');
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    },

    deletePage : function (page, emit) {
      this.remove(page._id);

      if(emit) {
        this.pages.emit('delete:page', page);
      }
    }

  });

  return Sitemap;

});