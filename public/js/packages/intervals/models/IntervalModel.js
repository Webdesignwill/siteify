
define([
  'Backbone',
  'Oauth2Model',
  'SelectionCollection'
], function (Backbone, Oauth2Model, SelectionCollection) {

  "use strict";

  var IntervalModel = Backbone.Model.extend({

    defaults : {
      selected : false,
      match : false,
      trash : false
    },

    initialize : function () {
      this.listenTo(SelectionCollection, 'all', function (event, model, selectionCollection) {
        if(event === 'add' || event === 'remove') return this.filter();
      });
      this.filter();
    },

    parseNotes : function (notes) {
      var n = [];
      notes = notes.split(',');
      for(var j = 0; j<notes.length; j++) {
        n.push(parseFloat(notes[j]));
      }
      return n;
    },

    parse : function (object) {
      object.id = object._id;
      object.displayNotes = object.notes;
      object.notes = this.parseNotes(object.notes);
      return object;
    },

    filter : function () {
      var selection = [];
      for(var i = 0;i<SelectionCollection.models.length;i++) {
        var model = SelectionCollection.models[i];
        selection.push(model.get('number'));
      }

      if(!selection.length) {
        this.set('match', false);
      } else {
        var ar = _.difference(selection, this.get('notes'));
        this.set({
          match : !ar.length ? true : false
        });
      }
    }

  });

  return IntervalModel;

});