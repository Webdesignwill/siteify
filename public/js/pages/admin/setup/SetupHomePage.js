
define([
  'App',
  'text!pages/admin/setup/templates/setuphomepage.tpl'
], function (App, template) {

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
        // App.Router.navigate('go-somewhere', {trigger:true});
      } else {
        alert('Something went wrong making a new page');
      }
    }

  });

  return SetupHomePage;

});