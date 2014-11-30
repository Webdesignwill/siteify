
define([
  'require'
], function (require) {

  "use strict";

  var Forms = function () {

    var formView = {},
          model,
          action,
          done;

    function loadForm (options) {
      require(['FormView'], function (FormView) {
        formView = new FormView({
          name : options.name,
          el : options.el,
          serverModel : model,
          displayModel : model.attributes
        });

        formView.on('valid', function (opts) {
          formValid(opts.validationModel);
        });

      });
    }

    function formValid (validationModel) {
      model[action](validationModel.attributes, function (result, data, status) {
        if(result) { return done(result, data, status); }
        alert('TODO : Server Errors');
      });
    }

    function clear () {
      formView.clear();
    }

    function destroy () {
      formView.destroy();
    }

    function init (m, options, d) {
      model = m;
      action = options.action;
      done = d;

      loadForm(options);
    }

    return {
      init : init,
      destroy : destroy
    };

  };

  return Forms;

});