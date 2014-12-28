
var siteify_require = require.config({

  baseUrl : './js/',
  context : 'siteify_require',

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
    io                                                          : 'libs/sockets/sockets.io',

    Router                                                  : 'Router',
    Errors                                                   : 'Errors',
    SiteifyLive                                            : 'SiteifyLive',

    Siteify                                                   : 'Siteify',
    PageFactory                                          : 'pages/PageFactory',
    Sitemap                                                : 'Sitemap',

    /* Owner/Site Setup */
    SetupOwnerPage                                   : 'pages/siteify/setup/SetupOwnerPage',
    SetupSitePage                                        : 'pages/siteify/setup/SetupSitePage',
    SetupHomePage                                    : 'pages/siteify/setup/SetupHomePage',

    /* Forms */
    LoginView                                              : 'display/forms/LoginView',
    RegisterView                                          : 'display/forms/RegisterView',
    ProfileView                                             : 'display/forms/ProfileView',

    NewPageView                                         : 'display/forms/NewPageView',
    ConfirmView                                          : 'display/forms/ConfirmView',

    UserListItemView                                    : 'display/siteify/usersList/UserListItemView',
    UsersListView                                          : 'display/siteify/usersList/UsersListView',

    SiteifyHeaderView                                 : 'display/siteify/siteifyHeader/SiteifyHeaderView',
    SiteifyHeaderControlsView                    : 'display/siteify/siteifyHeader/SiteifyHeaderControlsView',
    ConfirmDeleteView                                : 'display/siteify/confirmDelete/ConfirmDeleteView',

    /* Extensions */
    pageExt                                                 : 'pages/pageExt',

    /* Pages, Public */
    DefaultPage                                          : 'pages/public/DefaultPage',

    /* Public */
    BodyView                                               : 'display/body/BodyView',
    HeaderView                                            : 'display/header/HeaderView',
    NavSubView                                           : 'display/header/NavSubView',
    UserHeaderView                                     : 'display/header/UserHeaderView',
    ModalView                                             : 'display/modal/ModalView',

    /* Site models */
    MeModel                                                 : 'models/MeModel',
    Oauth2Model                                          : 'models/Oauth2Model',
    PageModel                                              : 'models/PageModel',
    UserModel                                              : 'models/UserModel',

    /* Siteify Collections */
    UsersCollection                                      : 'collections/UsersCollection'

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
  deps : ['jquery', 'underscore', 'Siteify', 'domReady', 'bootstrap', 'pageExt', 'Validation', 'SiteifyLive'],
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