
define(['SiteifyModel'], function (SiteifyModel) {

    "use strict";

    var PageFactory = function () {

      function closeCurrentPage (done) {
        var page = SiteifyModel.get('page');
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

      this.make = function ($container, pageModel, Page, identifier) {

        function produce () {
          var pageIdClass = pageModel.get('name') + '-page';
          var page = new Page({
            model : pageModel,
            id : pageIdClass,
            className : pageIdClass,
            identifier : identifier || null
          });

          $container.html(page.render().el);

          openNextPage($container, page, function () {
            SiteifyModel.set('page', {
              id : pageModel.get('id'),
              view : page,
              model : pageModel
            });
          });
        }

        closeCurrentPage(produce);

      };

    };

    return PageFactory;

});