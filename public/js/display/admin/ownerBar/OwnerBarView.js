
define([
  'App',
  'SiteifyModel',
  'OwnerBarControlsView',
  'text!display/admin/ownerBar/templates/ownerbar.tpl'
], function (App, SiteifyModel, OwnerBarControlsView, template) {

  "use strict";

  var OwnerBarView = Backbone.View.extend({

    events : {
      'click .owner-bar-live' : 'toggleLive'
    },

    initialize : function () {

      var self = this;

      this.listenTo(App.User, 'change:loggedin', function (user, loggedin) {
        if(loggedin) {
          this[user.get('owner') ? 'renderOwnerControls' : 'removeOwnerControls']();
        }
      }, this);

      App.$broker.on('siteify:live:change', function (event, live) {
        self.live(live);
      });

      this.render();
    },

    live : function (live) {
      this.$ownerBarLive[live ? 'addClass' : 'removeClass']('live');
    },

    toggleLive : function () {
      App.$broker.trigger('siteify:toggleLive');
    },

    setElements : function () {
      this.$ownerBarLive = this.$el.find('.owner-bar-live');
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
      this.setElements();
      return this;
    }

  });

  return OwnerBarView;

});