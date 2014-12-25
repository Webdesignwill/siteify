
define([
  'handlebars',
  'ListItemView',
  'SelectionCollection',
  'IntervalsCollection'
], function (handlebars, ListItemView, SelectionCollection, IntervalsCollection) {

  "use strict";

  var ListParentView = Backbone.View.extend({

    subViews : [],

    initialize : function () {

      this.listenTo(SelectionCollection, 'updated', function (model, options) {
        if(this.toggleNoResults()) return;
        this.clearSubViews();
      });

      this.listenTo(IntervalsCollection, 'add', function (model, options) {
        if(this.toggleNoResults()) return;
        this.clearSubViews();
      }, this);

      this.listenTo(IntervalsCollection, 'remove', function (model, options) {
        if(this.toggleNoResults()) return;
        this.clearSubViews();
      }, this);

      this.render();
      this.toggleNoResults();
    },

    toggleNoResults : function () {
      if(IntervalsCollection.getMatchCount() === 0) {
        return this.$el.html('<p class="text-info">There are no matches to display</p>');
      }
      return null;
    },

    /* Utility */
    clearSubViews : function () {
      for(var i = 0;i<this.subViews.length;i++) {
        this.subViews[i].close();
      }
      this.subViews = [];
      this.renderList();
    },

    renderList : function () {

      var frag = document.createDocumentFragment(),
            self = this;

      IntervalsCollection.each(function (model, index, collection) {
        if(model.get('match')) {
          var liv = new ListItemView({
            model : model
          });
          self.subViews.push(liv);
          /* Maybe dont call render here Do it instead in the item */
          frag.appendChild(liv.render().el);
        }
      });

      this.$el.html(frag);

    },

    render : function () {
      return this;
    }

  });

  return ListParentView;

});