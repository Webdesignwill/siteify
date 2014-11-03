
define([
  'App',
  'IntervalsCollection',
  'handlebars',
  'text!display/public/filteredList/templates/listItem.tpl'
], function (App, IntervalsCollection, handlebars, template) {

  "use strict";

  var ListItemView = Backbone.View.extend({

    tagName : 'a',
    className : 'list-group-item clearfix',
    selectedClass : 'list-group-item-info',
    trashClass : 'list-group-item-danger',
    events : {
      'click' : 'handler'
    },

    initialize : function () {

      var self = this;
      function isTheSame (model) {
        return model.get('_id') === self.model.get('_id');
      }

      this.listenTo(IntervalsCollection, 'change:selected', function (model) {
        if(!isTheSame(model)) return this.clearSelection();
      }, this);

      this.listenTo(IntervalsCollection, 'change:trash', function (model) {
        if(isTheSame(model)) return this.readyForTrash();
      }, this);

      App.$broker.on('clear:selection', function () {
        self.clearSelection();
      });
    },

    clearSelection : function () {
      this.model.set({
        selected : false
      }, {silent : true});
      this.model.set({
        trash : false
      });
      this.toggleClass('selected', this.selectedClass);
    },

    handler : function (e) {
      if(e.target.className.indexOf('delete-interval') === -1) {
        this.model.set({
          selected : this.model.get('selected') ? false : true,
          trash : false
        });
        this.toggleClass('selected', this.selectedClass);
        return;
      }
      if(this.model.get('trash')) {
        this.deleteInterval();
      }
      this.model.set({
        trash : true
      });
    },

    deleteInterval : function () {
      var self = this;
      IntervalsCollection.delete({
        _id : self.model.get('_id'),
      }, function (result, data, status) {
        if(result) { return; }
      });
    },

    readyForTrash : function () {
      this.$el[this.model.get('trash') ? 'addClass' : 'removeClass'](this.trashClass);
    },

    toggleClass : function (att, cls) {
      this.$el[this.model.get(att) ? 'addClass' : 'removeClass'](cls);
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.model.attributes);

      this.$el.html(compiled);
      this.toggleClass('selected', this.selectedClass);

      return this;
    },

    close : function () {
      this.stopListening();
      this.off();
      this.remove();
    }

  });

  return ListItemView;

});