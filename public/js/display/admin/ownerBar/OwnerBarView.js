
define([
  'SiteifyModel',
  'text!display/admin/ownerBar/templates/ownerbar.tpl'
], function (SiteifyModel, template) {

  "use strict";

  var OwnerBarView = Backbone.View.extend({

    initialize : function () {
      this.listenTo(SiteifyModel, 'change:page', function (siteifyModel, page) {
        this.changeTitle(page.model);
      }, this);
      this.render();
    },

    setElements : function () {
      this.$pageTitle = this.$el.find('.page-title');
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