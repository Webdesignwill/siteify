
define([
  'Siteify',
  'HeaderView',
  'ModalView',
  'SiteifyHeaderView',
  'text!display/body/templates/body.tpl'
], function (Siteify, HeaderView, ModalView, SiteifyHeaderView, template) {

  "use strict";

  var Body = Backbone.View.extend({

    el : 'body',

    initialize : function () {

      this.listenTo(Siteify.Me, 'change:loggedin', function (model, loggedin) {
        this.toggleClass(loggedin, 'loggedin');
      }, this);

      this.listenTo(Siteify, 'change:creationmode', function (model, creationmode) {
        this.toggleClass(creationmode, 'creationmode');
      }, this);

      this.render();
      this.setElements();
      this.renderPageComponents();
      // this.delegateAnchorClickEvent();

      this.toggleClass(Siteify.Me.get('loggedin'), 'loggedin');
    },

    /* Utility */
    toggleClass : function (att, cls) {
      this.$el[att ? 'addClass' : 'removeClass'](cls);
    },

    setElements : function () {
      this.$navBar = this.$el.find('#navbar');
      this.$modal = this.$el.find('#modal');
      this.$sfHeader = this.$el.find('#sf-header');
    },

    renderPageComponents : function () {

      new ModalView({
        el : this.$modal
      });

      new SiteifyHeaderView({
        el : this.$sfHeader
      });

      new HeaderView({
        el : this.$navBar
      });

    },

    delegateAnchorClickEvent : function () {
      var self = this;
      if (Backbone.history) { // Could also work with pushstates (&& Backbone.history._hasPushState)
        $(document).delegate("a:not(.anchor)", "click", function (evt) {
          var href = $(this).attr("href");
          var protocol = this.protocol + "//";
          if (href && href.slice(0, protocol.length) !== protocol) {
            evt.preventDefault();
          }
        });
      }
    },

    render : function () {
      this.$el.html(template);
      return this;
    }
  });

  return new Body();

});