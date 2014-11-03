
define([
  'App',
  'text!display/admin/user/templates/form.tpl'
], function (App, template) {

  "use strict";

  var Register = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
      this.render();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(App.User, {
        name : 'Register',
        action : 'register',
        el : this.$el.find('form')
      }, function () { self.done(); });
      return this;
    },

    done : function () {
      App.$broker.trigger('modal:close');
    },

    close : function () {
      this.form.destroy();
    }

  });

  return Register;

});