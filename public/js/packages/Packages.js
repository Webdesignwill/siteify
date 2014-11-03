
/* LoadCommonJsPackages requires each package associated with the current page.
  * Get the common JS module for the package incrementing the counter each time.
  * Require the package and attach the require object to the package object with its unique key
  * Load package and proxy a done method to the init
  * Wait for the package to be initialised or fail before moving to the next one.
  * If the package is already attached to the package object, then continue package
  ========================================================== */

define([
  'Siteify',
  'PageFactory',
  'launchControl'
], function (Siteify, PageFactory, launchControl) {

  "use strict";

  var Packages = function() {

    /* Packages is where each package reference will be stored and deps
        are the require dependencies that are shared with each package
    ========================================== */
    var packages = {};

    function loadCommonJsPackages (pgsArray) {

      var counter, packageName;

      function attachPackageElement () {
        /* Either grab the element where the package should be loaded in to
            or pass the whole page container
        ========================================== */
        var $page = Siteify.page.get('page'),
              $packageElement = $page.$el.find("[data-package='" + packageName + "']");

        return $packageElement.length > 0 ? $packageElement : $page.$el;
      }

      function initPackage () {

        /* Require the app mediator and attach it to the packages object
            for future use. Invoke the mediator after by calling each init method in turn
            with the launchControl.
        ======================================== */
        packages[packageName].req(['app'], function (app) {
          app.pageFactory = new PageFactory(app);
          app.$el = attachPackageElement();
          app.page = new Backbone.Model();

          packages[packageName].app = app;

          launchControl.call(app, {
            context : app,
            initMethods : app.dependencies,
            launch : function () {
              console.log('%c Package ' + packageName + ' has started ', 'background: #444f64; color: #FFFFFF');
              nextPackage();
            }
          });
        });
      }

      /* Store a reference to the package on the packages object
          then create the require object
      ======================================== */
      function loadPackage (config) {

        /* If the package already exists, continue package operations */
        if(packages[packageName] === undefined) {
          packages[packageName] = {
            req : window.require(config, function () {
              initPackage();
            })
          };
        } else {
          packages[packageName].app.$el = attachPackageElement();
          packages[packageName].app.continue(function () {
            console.log('%c Continuing ' + packageName + ' package ', 'background: #444f64; color: #00FFFF');
            nextPackage();
          });
        }
      }

      // Get the commonjs module
      function requireConfig () {
        siteify_require([packageName], function (config) {
          loadPackage(config(packageName));
        });
      }

      /* Check for the next package. Counter resets every time loadcommonJS is invoked
      =================================================== */
      function nextPackage () {
        counter = counter === undefined ? 0 : counter += 1;

        /* Check to see if there is another package. If not, they are all loaded */
        packageName = pgsArray[counter];
        if(packageName !== undefined) {
          requireConfig();
        } else {
          console.log('%c All packages are ready ', 'background: #00FF00; color: #444f64');
        }
      }

      nextPackage();

    }

    /* Listen to the page change and load packages in the packages array on the package model.
        pageModel.get('packages') returns an array. Could be empty but always an array. If it's more
        than 0 then start loading them.
    ========================================================== */
    Siteify.page.on('change:page', function (model) {
      var pageModel = model.get('page').model,
            pgsArray = pageModel.get('packages');

      if(pgsArray.length > 0) {
        loadCommonJsPackages(pgsArray);
      }

    }, this);

  };

  new Packages();

});