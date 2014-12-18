
define([
  'Siteify',
  'handlebars',
  'text!display/public/header/templates/userheader.tpl'
],

function (Siteify, handlebars, template) {

  "use strict";

  var UserHeaderView = Backbone.View.extend({

    initialize : function () {
      this.listenTo(Siteify.User, 'change', function () {
        this.render();
      }, this);
      this.listenToOnce(Siteify, 'change:owner', function () {
        this.render();
      }, this);

      if(Siteify.get('owner')) {
        this.stopListening(Siteify);
        this.render();
      }

    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(Siteify.User.attributes);

      this.$el.html(compiled);
      return this;
    }

  });

  return UserHeaderView;

});
