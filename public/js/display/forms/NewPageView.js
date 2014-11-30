
define([
  'App',
  'text!display/forms/templates/form.tpl'
], function (App, template) {

  "use strict";

  var NewPage = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
      this.render();
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
        App.$broker.trigger('modal:close');
      } else {
        alert('There was a problem creating a new page');
      }
    },

    close : function () {
      this.form.destroy();
    }

  });

  return NewPage;

});