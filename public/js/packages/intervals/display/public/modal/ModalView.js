
define([
  'Siteify',
  'require',
  'text!display/public/modal/templates/modal.tpl'
], function (Siteify, require, template) {

  "use strict";

  var Modal = Backbone.View.extend({

    subView : {},

    initialize : function () {
      var self = this;
      Siteify.$broker.on('modal:open', function (event, options) {
        self.load(options);
      });
      Siteify.$broker.on('modal:close', function (event) {
        self.$el.modal('hide');
      });
      this.$el.on('hidden.bs.modal', function (e) {
        self.close();
      });

      this.render();
      this.setElements();
    },

    setElements : function () {
      this.$modalBody = this.$el.find('.modal-body');
    },

    load : function (view) {
      var self = this;
      require([view + 'View'], function (View) {
        var view = new View({
          el : self.$modalBody,
          cb : function closeModal () {
            this.$el.modal('hide');
          }
        });
        self.subView = view;
      });

      this.$el.modal();
    },

    render : function () {
      this.$el.html(template);
      return this;
    },

    close : function () {
      if(typeof this.subView.close === 'function') this.subView.close();
      this.subView = {};
    }
  });

  return Modal;

});