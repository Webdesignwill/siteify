
define([
  'App',
  'SiteifyModel',
  'handlebars',
  'text!display/public/header/templates/userheader.tpl'
],

function (App, SiteifyModel, handlebars, template) {

  "use strict";

  var UserHeaderView = Backbone.View.extend({

    initialize : function () {
      this.listenTo(App.User, 'change', function () {
        this.render();
      }, this);
      this.listenToOnce(SiteifyModel, 'change:owner', function () {
        this.render();
      }, this);

      if(SiteifyModel.get('owner')) {
        this.stopListening(SiteifyModel);
        this.render();
      }

    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(App.User.attributes);

      this.$el.html(compiled);
      return this;
    }

  });

  return UserHeaderView;

});
