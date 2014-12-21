
define([
  'Siteify',
  'handlebars',
  'text!display/public/header/templates/userheader.tpl'
],

function (Siteify, handlebars, template) {

  "use strict";

  var UserHeaderView = Backbone.View.extend({

    events : {
      'click' : 'handler'
    },

    initialize : function () {
      this.listenTo(Siteify.User, 'change', function () {
        this.render();
      }, this);
      this.render();
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(Siteify.User.attributes);

      this.$el.html(compiled);
      return this;
    },

    handler : function (e) {
      e.preventDefault();
      var modalAtt = $(e.target).attr('modal');
      if(modalAtt) {
        Siteify.$broker.trigger('modal:open', {
          view : modalAtt,
          size : 'small'
        });
      }
    }

  });

  return UserHeaderView;

});
