
define([
  'App',
  'IntervalsCollection'
], function (App, IntervalsCollection) {

  "use strict";

  var Fret = Backbone.Model.extend({

    defaults : {
      selected : false
    },

    initialize : function () {
      this.listenTo(IntervalsCollection, 'change:selected', function (model) {
        this.matchNumber(model);
      }, this);

      var self = this;
      App.$broker.on('clear:selection', function (e) {
        self.set({selected : false, highlight : false});
      });
    },

    matchNumber : function (model) {
      if(model.get('selected')) {
        this.set({
          highlight : model.get('notes').indexOf(this.get('number')) !== -1
        });
        return;
      }
      this.set({
        highlight : model.get('selected')
      });
    }

  });

  return Fret;

});