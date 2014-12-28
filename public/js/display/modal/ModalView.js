
define([
  'Siteify',
  'require',
  'text!display/modal/templates/modal.tpl'
], function (Siteify, require, template) {

  "use strict";

  var Modal = Backbone.View.extend({

    subView : {},
    sizes : {
      small : 'modal-sm',
      large : 'modal-lg'
    },

    initialize : function () {
      var self = this;
      Siteify.$broker.on('modal:open', function (event, options) {
        self.setModalSize(options.size);
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

    setModalSize : function (size) {
      for(var key in this.sizes) {
        this.$modalDialog.removeClass(this.sizes[key]);
      }
      if(this.sizes[size]) {
        this.$modalDialog.addClass(this.sizes[size]);
      }
    },

    setElements : function () {
      this.$modalBody = this.$el.find('.modal-body');
      this.$modalDialog = this.$el.find('.modal-dialog');
    },

    load : function (options) {
      var self = this;
      require([options.view + 'View'], function (View) {
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