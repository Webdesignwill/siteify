
var siteify_require = require.config({

  baseUrl : './js/',
  context : 'siteify_require',

  packages: [{
    name : 'forms',
    location : 'forms'
  },{
    name : 'packages',
    location : 'packages'
  }],

  paths : {

    jquery                                                   : 'libs/jquery/jquery.min',
    Backbone                                              : 'libs/backbone/backbone.min',
    Validation                                            : 'libs/backbone/backbone.validation.min',
    underscore                                           : 'libs/underscore/underscore.min',
    handlebars                                           : 'libs/handlebars/handlebars',
    text                                                      : 'libs/require/text.min',
    domReady                                             : 'libs/require/domReady',
    bootstrap                                              : 'libs/bootstrap/bootstrap.min',

    Router                                                  : 'Router',

    Siteify                                                   : 'Siteify',
    PageFactory                                          : 'pages/PageFactory',
    Sitemap                                                : 'Sitemap',

    /* Extensions */
    pageExt                                                 : 'pages/pageExt',

    /* Pages */
    DefaultPage                                          : 'pages/default/DefaultPage',

    /* Public */
    BodyView                                               : 'display/public/body/BodyView',
    NavBarView                                            : 'display/public/navbar/NavBarView',
    NavSubView                                           : 'display/public/navbar/NavSubView',
    ModalView                                             : 'display/public/modal/modalView',

    /* Admin */
    LoginView                                              : 'display/admin/user/LoginView',
    RegisterView                                          : 'display/admin/user/RegisterView',
    ProfileView                                             : 'display/admin/user/ProfileView',

    /* Site models */
    UserModel                                              : 'models/UserModel',
    Oauth2Model                                          : 'models/Oauth2Model',
    PageModel                                              : 'models/PageModel'

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
  deps : ['jquery', 'underscore', 'Siteify', 'domReady', 'bootstrap', 'pageExt', 'Validation'],
  callback : function ($, _, Siteify, domReady) {

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
      Siteify.init();
    });
  }
});