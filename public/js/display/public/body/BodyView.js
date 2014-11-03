
define([
  'Siteify',
  'NavBarView',
  'ModalView',
  'text!display/public/body/templates/body.tpl'
], function (Siteify, NavBarView, ModalView, template) {

  "use strict";

  var Body = Backbone.View.extend({

    el : 'body',

    initialize : function () {

      this.listenTo(Siteify.User, 'change:loggedin', function (model, att, something) {
        this.toggleClass(att, 'loggedin');
      }, this);

      this.render();
      this.setElements();
      this.renderPageComponents();
      // this.delegateAnchorClickEvent();
    },

    toggleClass : function (att, cls) {
      this.$el[att ? 'addClass' : 'removeClass'](cls);
    },

    setElements : function () {
      this.$navBar = this.$el.find('#navbar');
      this.$modal = this.$el.find('#modal');
    },

    renderPageComponents : function () {

      new ModalView({
        el : this.$modal
      });

      new NavBarView({
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
            self.hrefController(href);
          }
        });
      }
    },

    hrefController : function (href) {
      var argsArray = href.split(':'),
            module = argsArray[0],
            event = argsArray[1],
            argument = argsArray[2] || null;

      if(module && event) {
        Siteify.$broker.trigger(module + ':' + event, argument);
      }
    },

    render : function () {
      this.$el.html(template);
      return this;
    }
  });

  return new Body();

});