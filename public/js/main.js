
var app_require = require.config({

  baseUrl : './js/',
  context : 'app_require',

  packages: [{
    name : 'forms',
    location : 'forms'
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
    Errors                                                   : 'Errors',

    App                                                      : 'App',
    PageFactory                                          : 'pages/PageFactory',
    Sitemap                                                : 'Sitemap',

    /* Owner/Site Setup */
    SetupOwnerPage                                   : 'pages/admin/setup/SetupOwnerPage',
    SetupSitePage                                        : 'pages/admin/setup/SetupSitePage',
    SetupHomePage                                    : 'pages/admin/setup/SetupHomePage',

    /* Forms */
    LoginView                                              : 'display/forms/LoginView',
    RegisterView                                          : 'display/forms/RegisterView',
    ProfileView                                             : 'display/forms/ProfileView',

    NewPageView                                         : 'display/forms/NewPageView',
    ConfirmView                                          : 'display/forms/ConfirmView',

    OwnerBarView                                        : 'display/admin/ownerBar/OwnerBarView',
    OwnerBarControlsView                          : 'display/admin/ownerBar/OwnerBarControlsView',
    ConfirmDeleteView                                : 'display/admin/confirmDelete/ConfirmDeleteView',

    /* Extensions */
    pageExt                                                 : 'pages/pageExt',

    /* Pages, Public */
    DefaultPage                                          : 'pages/public/DefaultPage',

    /* Public */
    BodyView                                               : 'display/public/body/BodyView',
    HeaderView                                            : 'display/public/header/HeaderView',
    NavSubView                                           : 'display/public/header/NavSubView',
    UserHeaderView                                     : 'display/public/header/UserHeaderView',
    ModalView                                             : 'display/public/modal/ModalView',

    /* Site models */
    UserModel                                              : 'models/UserModel',
    Oauth2Model                                          : 'models/Oauth2Model',
    PageModel                                              : 'models/PageModel',
    SiteifyModel                                           : 'models/SiteifyModel',

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
  deps : ['jquery', 'underscore', 'App', 'domReady', 'SiteifyModel', 'bootstrap', 'pageExt', 'Validation'],
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