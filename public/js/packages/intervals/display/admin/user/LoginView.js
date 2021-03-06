
define([
  'Siteify',
  'text!display/admin/user/templates/form.tpl'
], function (Siteify, template) {

  "use strict";

  var Login = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
      this.render();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(App.User, {
        name : 'Login',
        action : 'login',
        el : this.$el.find('form')
      }, function () { self.done(); });
      return this;
    },

    done : function () {
      Siteify.$broker.trigger('modal:close');
    },

    close : function () {
      this.form.destroy();
    }

  });

  return Login;

});