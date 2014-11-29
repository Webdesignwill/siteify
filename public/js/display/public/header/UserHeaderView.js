
define([
  'App',
  'handlebars',
  'text!display/public/header/templates/userheader.tpl'
],

function (App, handlebars, template) {

  "use strict";

  var UserHeaderView = Backbone.View.extend({

    initialize : function () {
      this.listenTo(App.User, 'change', function () {
        this.render();
      }, this);
      this.render();
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
