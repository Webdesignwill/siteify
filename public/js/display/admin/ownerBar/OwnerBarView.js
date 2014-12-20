
define([
  'Siteify',
  'OwnerBarControlsView',
  'text!display/admin/ownerBar/templates/ownerbar.tpl'
], function (Siteify, OwnerBarControlsView, template) {

  "use strict";

  var OwnerBarView = Backbone.View.extend({

    events : {
      'click .owner-bar-live' : 'toggleLive'
    },

    initialize : function () {

      var self = this;

      this.listenTo(Siteify.User, 'change:loggedin', function (user, value) {
        this[user.get('owner') ? 'renderOwnerControls' : 'removeOwnerControls']();
      }, this);

      Siteify.$broker.on('siteify:live:change', function (event, live) {
        self.live(live);
      });

      this.render();
    },

    live : function (live) {
      this.$ownerBarLive[live ? 'addClass' : 'removeClass']('live');
    },

    toggleLive : function () {
      Siteify.$broker.trigger('siteify:toggleLive');
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
      if(Siteify.User.get('loggedin') && Siteify.User.get('owner')) {
        this.ownerBarControlsView = new OwnerBarControlsView({
          el : this.$el.find('.sf-owner-controls')
        });
      }
    },

    render : function () {
      this.$el.html(template);
      this.setElements();

      this.renderOwnerControls();

      return this;
    }

  });

  return OwnerBarView;

});