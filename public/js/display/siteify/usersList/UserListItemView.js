
define([
  'Siteify',
  'handlebars',
  'text!display/siteify/usersList/templates/usersListItem.tpl'
], function (Siteify, handlebars, template) {

  'use strict';

  var UserListItemView = Backbone.View.extend({

    tagName : 'tr',
    trashClass : 'list-group-item-danger',

    initialize : function (options) {
      this.model = options.model;
      this.render();
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.model.attributes);

      this.$el.html(compiled);
      return this;
    },

    close : function () {
      this.$el.off();
      this.stopListening();
      this.$el.remove();
    }

  });

  return UserListItemView;

});