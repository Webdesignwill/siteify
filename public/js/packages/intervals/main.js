define(function (require, exports, module) {
  module.exports = function (name) {
    return {
      baseUrl                                        : '/js/packages/' + name,
      context                                        : name + '_require',
      paths : {
        App                                                       : 'Siteify',

        /* Public */
        BodyView                                               : 'display/public/body/BodyView',

        FretboardView                                        : 'display/public/fretboard/FretboardView',
        FretView                                                 : 'display/public/fretboard/FretView',
        FretModel                                               : 'display/public/fretboard/model/FretModel',

        NavBarView                                            : 'display/public/navbar/NavBarView',

        MatchCountView                                    : 'display/public/matchCount/MatchCountView',
        ModalView                                              : 'display/public/modal/ModalView',

        ListItemView                                           : 'display/public/filteredList/ListItemView',
        ListParentView                                        : 'display/public/filteredList/ListParentView',

        DescriptionView                                     : 'display/public/description/DescriptionView',

        ControlBoardView                                   : 'display/public/controlBoard/ControlBoardView',
        ButtonView                                             : 'display/public/buttons/ButtonView',

        IntervalsCollection                                 : 'collections/IntervalsCollection',
        SelectionCollection                                : 'collections/SelectionCollection',

        IntervalModel                                         : 'models/IntervalModel',
        UserModel                                              : 'models/UserModel',
        Oauth2Model                                          : 'models/Oauth2Model',

        /* Admin */
        LoginView                                              : 'display/admin/user/LoginView',
        RegisterView                                          : 'display/admin/user/RegisterView',
        ProfileView                                             : 'display/admin/user/ProfileView',

        IntervalManagementView                        : 'display/admin/intervals/IntervalManagementView'
      },
      shim : {
        'handlebars': {
          exports: 'Handlebars'
        }
      },
      deps : ['Siteify', 'router']
    };
  };
});


var base_require = require.config({

  baseUrl : './js/',
  context : 'base_require',

  packages: [{
    name : 'forms',
    location : 'forms'
  }],

  paths : {

    jquery                                       : 'libs/jquery/jquery.min',
    Backbone                                  : 'libs/backbone/backbone.min',
    Validation                                 : 'libs/backbone/backbone.validation.min',
    underscore                                : 'libs/underscore/underscore.min',
    handlebars                                : 'libs/handlebars/handlebars',
    text                                           : 'libs/require/text.min',
    domReady                                 : 'libs/require/domReady',
    bootstrap                                  : 'libs/bootstrap/bootstrap.min',



  },
  shim : {
    'Backbone' : {
      deps : ['jquery', 'underscore', 'handlebars'],
      exports : "Backbone"
    },
    'handlebars' : {
      exports: 'Handlebars'
    },
    'bootstrap' : {
      deps : ['jquery'],
      exports : 'bootstrap'
    }
  },
  deps : ['jquery', 'underscore', 'Siteify', 'domReady', 'bootstrap', 'Validation'],
  callback : function ($, _, App, domReady) {

    // Mix in the validation for all models. Do something with this
    // cause it can't very well go here
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
    _.extend(Backbone.Validation.validators, {
      unique: function(value, attr, customValue, model) {

        var req = {};
        req[attr] = value;

        if(!this.required(value, attr, customValue, model)) {
          reqProps = {
            type : 'POST',
            async: false,
            context : this,
            url : model.urls[attr],
            contentType : 'application/x-www-form-urlencoded',
            data : req
          };
          return $.ajax(reqProps).status === 200 ? false : true;
        }
      }
    });

    domReady(function() {
      App.init();
    });
  }
});