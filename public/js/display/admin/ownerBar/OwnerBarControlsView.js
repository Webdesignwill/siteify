
define([
  'Siteify',
  'handlebars',
  'text!display/admin/ownerBar/templates/ownerbarcontrols.tpl'
], function (Siteify, handlebars, template) {

  "use strict";

  var OwnerBarControlsView = Backbone.View.extend({

    events : {
      'click' : 'handler'
    },

    initialize : function () {
      this.listenTo(Siteify, 'change:page', function (siteifyModel, page) {
        this.render();
      }, this);

      if(Siteify.get('page')) {
        this.render();
      }
    },

    setElements : function () {
      this.$deletePage = this.$el.find('.delete-page');
    },

    render : function () {

      var model = Siteify.get('page').model;

      var tpl = handlebars.compile(template);
      var compiled = tpl(model.attributes);
      this.$el.html(compiled);

      this.setElements();

      if(model.get('homepage')) {
        this.$deletePage.addClass('disabled');
      }

      return this;
    },

    handler : function (e) {
      e.preventDefault();
      var modalAtt = $(e.target).attr('modal');

      if(modalAtt) {
        if(Siteify.get('page').model.get('homepage') && modalAtt === "ConfirmDelete") {
          return;
        }
        Siteify.$broker.trigger('modal:open', {
          view : modalAtt
        });
      }
    },

    destroy : function () {
      this.$el.off();
      this.stopListening();
      this.$el.empty();
    }

  });

  return OwnerBarControlsView;

});