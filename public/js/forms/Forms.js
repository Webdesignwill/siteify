
define([
  'require'
], function (require) {

  "use strict";

  var Forms = Backbone.Model.extend({

    init : function (model, options, done) {
      this.model = model;
      this.action = options.action;
      this.done = done;

      this.loadForm(options);
    },

    loadForm : function (options) {
      var self = this;
      require(['FormView'], function (FormView) {
        self.formView = new FormView({
          name : options.name,
          el : options.el,
          serverModel : self.model,
          displayModel : self.model.attributes
        });

        self.listenTo(self.formView, 'valid', function (opts) {
          self.formValid(opts.validationModel);
        }, self);

      });
    },

    formValid : function (validationModel) {
      var self = this;
      this.model[this.action](validationModel.attributes, function (result, data, status) {
        if(result) { return self.done(); }
        alert('TODO : Server Errors');
      });
    },

    destroy : function () {
      this.formView.destroy();
    },

    clear : function () {
      this.formView.clear();
    }

  });

  return Forms;

});