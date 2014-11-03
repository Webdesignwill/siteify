define(function (require, exports, module) {
  module.exports = function () {
    return {
      baseUrl                                                        : '/js/forms',
      context                                                        : 'siteify_forms',
      paths : {

        text                                                            : '../libs/require/text.min',
        handlebars                                                 : '../libs/handlebars/handlebars',

        Forms                                                         : 'Forms',
        FormView                                                   : 'FormView',

        // User
        LoginModel                                                 : 'login/LoginModel',
        ProfileModel                                                : 'profile/ProfileModel',
        RegisterModel                                              : 'register/RegisterModel',
        IntervalModel                                               : 'interval/IntervalModel'
      },
      deps : ['Forms']
    };
  };
});