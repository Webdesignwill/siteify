
define([
  'App',
  'SiteifyModel',
  'OwnerBarControlsView',
  'text!display/admin/ownerBar/templates/ownerbar.tpl'
], function (App, SiteifyModel, OwnerBarControlsView, template) {

  "use strict";

  var OwnerBarView = Backbone.View.extend({

    initialize : function () {
      var action;
      this.listenTo(SiteifyModel, 'change:page', function (siteifyModel, page) {
        this.changeTitle(page.model);
      }, this);

      this.listenTo(App.User, 'change:loggedin', function (user, loggedin) {
        if(loggedin) {
          this[user.get('owner') ? 'renderOwnerControls' : 'removeOwnerControls']();
        }
      }, this);

      this.render();
    },

    setElements : function () {
      this.$pageTitle = this.$el.find('.page-title');
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
    },

    changeTitle : function (model) {
      this.$pageTitle.html(model.get('title'));
    }

  });

  return OwnerBarView;

});