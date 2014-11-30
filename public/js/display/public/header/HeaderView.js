
define([
  'App',
  'SiteifyModel',
  'NavSubView',
  'UserHeaderView',
  'text!display/public/header/templates/header.tpl'
], function (App, SiteifyModel, NavSubView, UserHeaderView, template) {

  "use strict";

  var NavBar = Backbone.View.extend({

    navItems : {},

    initialize : function () {
      this.listenTo(App.Sitemap, 'add', function (model) {
        if(model.get('nav')) {
          this.addNavItem(model);
        }
      }, this);
      this.listenTo(App.Sitemap, 'remove', function (model) {
        if(model.get('nav')) {
          this.removeNavItem(model);
        }
      }, this);
      this.listenTo(SiteifyModel, 'change:sitename', function (model) {
        this.renderTitle();
      }, this);

      this.render();
    },

    setElements : function () {
      this.$sfPrimaryNav = this.$el.find('#sf-primary-nav');
      this.$sfUserHeader = this.$el.find('#sf-user-header');
      this.$sfSitename = this.$el.find('.sf-sitename');
    },

    render : function () {
      this.$el.html(template);
      this.setElements();

      this.renderTitle();
      new UserHeaderView({el : this.$sfUserHeader});
      return this;
    },

    renderTitle : function () {
      this.$sfSitename.html(SiteifyModel.get('sitename'));
    },

    addNavItem : function (model) {
      var navSubView = new NavSubView({model : model});
      this.navItems[model.get('_id')] = navSubView;
      this.$sfPrimaryNav.append(navSubView.render().el);
    },

    removeNavItem : function (model) {
      this.navItems[model.get('_id')].destroy();
    }

  });

  return NavBar;

});