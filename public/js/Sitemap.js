
define([
  'PageModel'
],

function (PageModel) {

  "use strict";

  var Sitemap = Backbone.Collection.extend({

    // url : 'js/sitemap-stub.json',
    url : '/api/pages/all',
    urls : {
      // register : '/api/user/register',
      // login : '/api/user/login',
      // logout : '/api/user/logout',
      // me : '/api/user/me',
      // session : '/api/user/session'
    },

    model : PageModel,

    initialize : function () {},

    parse : function (response, options) {
      // TODO, create the id on set @ mongo
      for(var i = 0; i<response.length;i++) {
        response[i].id = response[i]._id;
      }
      return response;
    }

  });

  return Sitemap;

});