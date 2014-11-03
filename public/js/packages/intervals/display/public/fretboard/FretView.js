
define([
  'IntervalsCollection',
  'SelectionCollection',
  'handlebars',
  'text!display/public/fretboard/templates/fret.tpl'
], function (IntervalsCollection, SelectionCollection, handlebars, template) {

  "use strict";

  var Fret = Backbone.View.extend({

    tagName : 'li',
    className : 'col-md-1 col-xs-1',
    events : {
      'click' : 'handler'
    },

    initialize : function () {
      var self = this;
      this.model.on('change:selected', function () {
        self.updateAttrs();
      });
      this.model.on('change:highlight', function () {
        self.toggleClass('highlight');
      });
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl({count : this.model.get('number')});

      this.$el.html(compiled);
      return this;
    },

    handler : function (e) {
      this.model.set('selected', this.model.get('selected') ? false : true);
    },

    toggleClass : function (att) {
      this.$el[this.model.get(att) ? 'addClass' : 'removeClass'](att);
    },

    updateAttrs : function () {
      this.toggleClass('selected');
      var action = this.model.get('selected') ? 'add' : 'remove';
      SelectionCollection[action](this.model);
      SelectionCollection.trigger('updated', this);
    }
  });

  return Fret;

});