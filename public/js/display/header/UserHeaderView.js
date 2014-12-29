
define([
  'Siteify',
  'handlebars',
  'text!display/header/templates/userheader.tpl'
],

function (Siteify, handlebars, template) {

  "use strict";

  var UserHeaderView = Backbone.View.extend({

    events : {
      'click' : 'handler'
    },

    initialize : function () {
      this.listenTo(Siteify.Me, 'change', function () {
        this.render();
      }, this);
      this.render();
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(Siteify.Me.attributes);

      this.$el.html(compiled);
      return this;
    },

    handler : function (e) {
      e.preventDefault();
      var modalAtt = $(e.target).attr('modal'),
            logout = $(e.target).attr('logout');

      if(modalAtt) {
        Siteify.$broker.trigger('modal:open', {
          view : modalAtt,
          size : 'small'
        });
      }
      if(logout) {
        Siteify.$broker.trigger('user:logout');
      }
    }

  });

  return UserHeaderView;

});
