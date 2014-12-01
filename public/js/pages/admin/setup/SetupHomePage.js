
define([
  'App',
  'Errors',
  'text!pages/admin/setup/templates/setuphomepage.tpl'
], function (App, Errors, template) {

  "use strict";

  var SetupHomePage = Backbone.Page.extend({

    initialize : function () {
      this.form = new App.Forms();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(App.Sitemap, {
        name : 'NewPage',
        action : 'newPage',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        App.Router.navigate(data.path, {trigger:true});
      } else {
        new Errors('server', data.responseText);
      }
    }

  });

  return SetupHomePage;

});