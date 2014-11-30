
define(['App'],

function (App) {

  "use strict";

  var PageModel = Backbone.Model.extend({

    initialize : function () {
      var to;
      this.listenTo(this, 'change', function (page) {
        for(var key in page.changed) {
          to = typeof page.changed[key] !== 'object' ? ' to : ' + page.changed[key] + ' ' : ' ';
          console.log('%c Page ' + page.get('title') + ' changed ' + key + to, 'background: #222222; color: #00feff;');
        }
      }, this);
    },

    parse : function (model) {
      model.id = model._id;
      model.route = model.name + '(/)';
      return model;
    }

  });

  return PageModel;

});
