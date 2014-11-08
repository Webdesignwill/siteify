
define(['PageModel'],

function (PageModel) {

  "use strict";

  var Sitemap = Backbone.Collection.extend({

    // url : 'js/sitemap-stub.json',
    url : '/api/pages/all',
    urls : {
      create : '/api/pages/create'
    },

    model : PageModel,

    initialize : function () {},

    parse : function (response, options) {
      // TODO, create the id on set @ mongo
      for(var i = 0; i<response.length;i++) {
        response[i].id = response[i]._id;
      }
      return response;
    },

    create : function (page, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.create,
        contentType : 'application/x-www-form-urlencoded',
        data : page,
        success : function (data, status) {
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