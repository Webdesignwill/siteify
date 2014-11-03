
define([
  'Backbone',
  'require',
  'IntervalsCollection'
], function (Backbone, require, IntervalsCollection) {

  "use strict";

  var App = Backbone.Model.extend({

    $broker : $({}),

    defaults : {
      octave : 12
    },

    init : function () {
      this.loadIntervals(this.loadBody);
      this.loadUserModel();
    },

    loadIntervals : function (done) {
      IntervalsCollection.fetch({success : done});
    },

    loadBody : function () {
      require(['BodyView'], function (BodyView) {});
    },

    loadUserModel : function () {
      var self = this;
      require(['UserModel'], function (UserModel) {
        self.User = new UserModel();
        self.loadForms();
      });
    },

    loadForms : function () {
      var self = this;
      base_require(['forms'], function (config) {
        function load () {
          req(['Forms'], function (Forms) {
            self.Forms = Forms;
          });
        }
        var req = window.require(config(), function () {
          load();
        });
      });
    }

  });

  return new App();

});