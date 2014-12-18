
define([
  'Siteify',
  'text!display/forms/templates/form.tpl'
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
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        Siteify.$broker.trigger('modal:close');
      } else {
        alert('The was a problem updating your profile');
      }
    },

    close : function () {
      this.form.destroy();
    }

  });

  return Profile;

});