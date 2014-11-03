
define([
  'Siteify',
  'handlebars',
  'NavSubView',
  'text!display/public/navbar/templates/navbar.tpl'
], function (Siteify, handlebars, NavSubView, template) {

  "use strict";

  var NavBar = Backbone.View.extend({

    initialize : function () {
      this.listenTo(Siteify.User, 'change', function () {
        this.render();
      }, this);

      this.render();
    },

    setElements : function () {
      this.$sfPrimaryNav = this.$el.find('#sf-primary-nav');
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(Siteify.User.attributes);

      this.$el.html(compiled);
      this.setElements();

      this.renderNav();

      return this;
    },

    renderNav : function () {
      var fragment = document.createDocumentFragment(),
            sitemap = Siteify.Sitemap.attributes;

      for(var key in sitemap){
        if(sitemap[key].get('nav')) {
          var navSubView = new NavSubView({model : sitemap[key]});
          fragment.appendChild(navSubView.render().el);
        }
      }

      this.$sfPrimaryNav.html(fragment);
    }

  });

  return NavBar;

});