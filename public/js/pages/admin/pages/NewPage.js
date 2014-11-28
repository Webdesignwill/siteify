
define([
  'App'
], function (App) {

  "use strict";

  var NewPage = Backbone.Page.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
    },

    render : function () {
      this.$el.html(this.options.template);
      var self = this;
      this.form.init(App.Sitemap, {
        name : 'NewPage',
        action : 'newPage',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        console.log('DATA : ', data);
      } else {
        alert('Something went wrong making a new page');
      }
    }

  });

  return NewPage;

});