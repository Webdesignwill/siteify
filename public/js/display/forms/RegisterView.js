
define([
  'Siteify',
  'text!display/forms/templates/form.tpl'
], function (Siteify, template) {

  "use strict";

  var Register = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new Siteify.Forms();
      this.render();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(Siteify.User, {
        name : 'Register',
        action : 'register',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        Siteify.$broker.trigger('modal:close');
      } else {
        alert('There was a problem registering you as a user');
      }
    },

    close : function () {
      this.form.destroy();
    }

  });

  return Register;

});