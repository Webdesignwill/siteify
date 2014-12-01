
define([
  'App',
  'SiteifyModel',
  'OwnerBarControlsView',
  'text!display/admin/ownerBar/templates/ownerbar.tpl'
], function (App, SiteifyModel, OwnerBarControlsView, template) {

  "use strict";

  var OwnerBarView = Backbone.View.extend({

    initialize : function () {
      this.listenTo(App.User, 'change:loggedin', function (user, loggedin) {
        if(loggedin) {
          this[user.get('owner') ? 'renderOwnerControls' : 'removeOwnerControls']();
        }
      }, this);

      this.render();
    },

    removeOwnerControls : function () {
      if(this.ownerBarControlsView) {
        this.ownerBarControlsView.destroy();
      }
    },

    renderOwnerControls : function () {
      this.ownerBarControlsView = new OwnerBarControlsView({
        el : this.$el.find('.sf-owner-controls')
      });
    },

    render : function () {
      this.$el.html(template);
      return this;
    }

  });

  return OwnerBarView;

});