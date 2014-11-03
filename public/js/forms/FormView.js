
define([
  'require',
  'handlebars'
], function (siteify_forms, handlebars, template) {

  "use strict";

  var FormView = Backbone.View.extend({

    events : {
      'submit' : 'submit'
    },

    initialize : function (options) {
      this.$form = {};

      this.displayModel = options.displayModel;
      this.model = options.serverModel;

      var self = this;
      this.loadModel(options.name, function (name) {
        self.loadTemplate(name);
      });
    },

    loadModel : function (name, callback) {
      var self = this;
      this.loader({ load : name + 'Model' }, function (Model) {
        self.validationModel = new Model();

        self.listenTo(self.validationModel, 'validated', function (isValid, model, errors) {
          self.toggleAll(errors);
        });

        callback(name);
      });
    },

    loadTemplate : function (name) {
      var self = this; name = name.toLowerCase();
      this.loader({ load : 'text!' + name + '/' + name + '.tpl'}, function (template) {
        self.render(template);
      });
    },

    loader : function (options, callback) {
      var self = this;
      siteify_forms([options.load], function (Module) {
        callback(Module);
      });
    },

    render : function (template) {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.displayModel);
      this.$el.html(compiled);
      this.initValidation();
      return this;
    },

    initValidation : function () {
      var self = this, vali = this.validationModel.validation;

      function isValidatedElement (key) {
        return self.$el.find('[name="' + key + '"]');
      }

      function hasValidationProperty (key, prop) {
        for(var i = 0;i<vali[key].length;i++) {
          if(vali[key][i][prop]) return true;
        }
        return false;
      }

      function mapValidationObjects (key) {
        var $formGroup = $Vel.closest('.form-group'),
              $label = $Vel.prev('label');

        self.$form[key] = {
          $Vel : $Vel,
          $label : $label,
          $formGroup : $formGroup,
          labelText : $label.html(),
          unique : hasValidationProperty(key, 'unique')
        };
      }

      function setEvent (key) {
        var form = self.$form[key], msg;
        form.$Vel.on('blur', function () {
          msg = self.validationModel.preValidate(key, form.$Vel.val());
          if(!msg) {
            self.validationModel.set(key, form.$Vel.val());
            self.toggleValid(form, false);
          }
          if(form.unique && form.$Vel.val()) {
            self.toggleValid(form, msg);
          }
        });
      }

      for(var key in vali) {
        var $Vel = isValidatedElement(key);
        if($Vel) {
          mapValidationObjects(key);
          setEvent(key);
        }
      }
    },

    parseSet : function (persist) {
      var key, props = {}, val;
      for(key in this.$form) {
        val = this.$form[key].$Vel.val();
        props[key] = persist && !val ? this.model.get(key) : val;
      }
      return props;
    },

    submit : function (e) {
      e.preventDefault();
      var self = this;

      this.validationModel.set(this.parseSet(this.validationModel.persist), {validate : true});

      if(this.validationModel.isValid()) {
        this.trigger('valid', {
          validationModel : this.validationModel
        });
      }
    },

    toggleAll : function (errors) {
      for(var key in this.$form) {
        this.toggleValid(this.$form[key], errors[key]);
      }
    },

    toggleValid : function (formProp, err) {
      formProp.$formGroup[err ? 'addClass' : 'removeClass']('has-error');
      formProp.$label.html(err ? err : formProp.labelText);
    },

    clear : function () {
      for(var key in this.$form) {
        this.$form[key].$Vel.val('');
      }
    },

    destroy : function () {
      this.form = {};
      this.stopListening();
      this.$el.off();
      this.$el.empty();
    }

  });

  return FormView;

});