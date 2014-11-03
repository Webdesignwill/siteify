
define([
  'Backbone'
], function (Backbone) {

  "use strict";

  var SelectionCollection = Backbone.Collection.extend({
    model : new Backbone.Model(),
    initialize : function () {}
  });

  return new SelectionCollection();

});