define(function (require, exports, module) {
  module.exports = function () {
    return {

      baseUrl                                                        : '/js/forms',
      context                                                        : 'siteify_packages',

      packages: [{
        name : 'github',
        location : 'github'
      },{
        name : 'intervalfilter',
        location : 'intervalfilter'
      }],

      paths : {
        Packages                                                    : 'Packages'
      },

      deps : ['Packages']
    };
  };
});