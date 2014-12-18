
define([
  'Siteify',
  'text!display/forms/templates/form.tpl'
], function (Siteify, template) {

  "use strict";

  var NewPage = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new Siteify.Forms();
      this.render();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(Siteify.Sitemap, {
        name : 'NewPage',
        action : 'newPage',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        Siteify.Router.navigate(data.path, {trigger:true});
        Siteify.$broker.trigger('modal:close');
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