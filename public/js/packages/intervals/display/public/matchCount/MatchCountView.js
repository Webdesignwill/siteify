
define([
  'IntervalsCollection',
  'SelectionCollection',
  'text!display/public/matchCount/templates/matchCount.tpl'
], function (IntervalsCollection, SelectionCollection, template) {

  "use strict";

  var MatchCount = Backbone.View.extend({

    initialize : function () {
      this.listenTo(SelectionCollection, 'updated', function (model, options) {
        this.updateMatchCount();
      }, this);

      this.listenTo(IntervalsCollection, 'remove', function (model, options) {
        this.updateMatchCount();
      }, this);

      this.listenTo(IntervalsCollection, 'all', function (model, options) {
        this.updateTotalCount();
      }, this);

      this.render();
    },

    setElements : function () {
      this.$matchCount = this.$el.find('.match-count');
      this.$totalCount = this.$el.find('.total-count');
    },

    updateMatchCount : function () {
      this.$matchCount.html(IntervalsCollection.getMatchCount());
    },

    updateTotalCount : function () {
      this.$totalCount.html(IntervalsCollection.length);
    },

    render : function () {
      this.$el.html(template);
      this.setElements();

      this.updateMatchCount();
      this.updateTotalCount();

      return this;
    }
  });

  return MatchCount;

});