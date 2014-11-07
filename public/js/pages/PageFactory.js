
define([], function () {

    "use strict";

    var PageFactory = function (module) {

      function closeCurrentPage (done) {
        var page = module.Page.get('page');
        if(page && typeof page.close === 'function') {
          return page.close(function () {
            done();
          });
        }
        done();
      }

      function openNextPage ($container, page, done) {
        if(typeof page.before === 'function') {
          return page.before(function () {
            done();
          });
        }
        done();
      }

      this.make = function (templatePath, $container, pageModel, Page, identifier) {

        /* Create the page instance. Could be DefaultPage, BlogPage etc
        ======================================== */
        function produce (template) {
          var pageIdClass = pageModel.get('name') + '-page';
          var page = new Page({
            model : pageModel,
            template : template,
            id : pageIdClass,
            className : pageIdClass,
            identifier : identifier || null
          });

          $container.html(page.render().el);

          openNextPage($container, page, function () {
            module.page.set({
              page : page,
              model : pageModel
            });
          });
        }

        closeCurrentPage(function () {
          $.get(templatePath + '/' + pageModel.get('name') + '.tpl', produce);
        });

      };

    };

    return PageFactory;

});