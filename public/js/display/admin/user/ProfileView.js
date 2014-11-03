
define([
  'Siteify',
  'text!display/admin/user/templates/form.tpl'
], function (Siteify, template) {

  "use strict";

  var Profile = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new Siteify.Forms();
      this.render();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(Siteify.User, {
        name : 'Profile',
        action : 'put',
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

  return Profile;

});