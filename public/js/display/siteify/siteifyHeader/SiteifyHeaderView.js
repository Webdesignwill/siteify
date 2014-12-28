
define([
  'Siteify',
  'SiteifyHeaderControlsView',
  'text!display/siteify/siteifyHeader/templates/siteifyheader.tpl'
], function (Siteify, SiteifyHeaderControlsView, template) {

  "use strict";

  var SiteifyHeaderView = Backbone.View.extend({

    events : {
      'click .sf-toggle-live' : 'toggleLive'
    },

    initialize : function () {

      var self = this;

      this.listenTo(Siteify.Me, 'change:loggedin', function (user, value) {
        this[user.get('owner') ? 'renderSiteifyControls' : 'removeSiteifyControls']();
      }, this);

      Siteify.$broker.on('siteify:live:change', function (event, live) {
        self.live(live);
      });

      this.render();
    },

    live : function (live) {
      this.$sfToggleLive[live ? 'addClass' : 'removeClass']('live');
    },

    toggleLive : function () {
      Siteify.$broker.trigger('siteify:toggleLive');
    },

    setElements : function () {
      this.$sfToggleLive = this.$el.find('.sf-toggle-live');
    },

    removeSiteifyControls : function () {
      if(this.siteifyHeaderControlsView) {
        this.siteifyHeaderControlsView.destroy();
      }
    },

    renderSiteifyControls : function () {
      if(Siteify.Me.get('loggedin') && Siteify.Me.get('owner')) {
        this.siteifyHeaderControlsView = new SiteifyHeaderControlsView({
          el : this.$el.find('.sf-controls')
        });
      }
    },

    render : function () {
      this.$el.html(template);
      this.setElements();

      this.renderSiteifyControls();

      return this;
    }

  });

  return SiteifyHeaderView;

});