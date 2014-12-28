
define([
  'Siteify',
  'handlebars',
  'UserListItemView',
  'UsersCollection',
  'text!display/siteify/usersList/templates/usersList.tpl'
], function (Siteify, handlebars, UserListItemView, UsersCollection, template) {

  'use strict';

  var UsersListView = Backbone.View.extend({

    subViews : [],

    initialize : function () {

      this.listenTo(UsersCollection, 'change', function () {
        this.close();
        this.renderList();
      }, this);

      this.render();
      this.renderList();
    },

    setElements : function () {
      this.$tableBody = this.$el.find('.table-body');
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(Siteify.attributes);

      this.$el.html(compiled);
      this.setElements();
      return this;
    },

    renderList : function () {
      var frag = document.createDocumentFragment(),
            self = this;

      UsersCollection.each(function (user, index, collection) {
        var userListItemView = new UserListItemView({
          model : user
        });
        self.subViews.push(userListItemView);
        frag.appendChild(userListItemView.el);
      });

      this.$tableBody.append(frag);
    },

    close : function () {
      for(var i = 0;i<this.subViews.length;i++) {
        this.subViews[i].close();
      }
      this.subViews = [];
    }

  });

  return UsersListView;

});