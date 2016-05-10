;(function() {
  'use strict';

  angular
    .module('app.core', [
      /* Angular Modules */
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ngTouch',
      /* Cross-app Modules */
      'blocks.exception',
      'blocks.logger',
      'blocks.router',
      /* Router Modules */
      'ui.router',
      'ct.ui.router.extras.core',
      'permission',
      'permission.ui',
      'anim-in-out',
      'uiRouterStyles',
      /* 3rd Party Modules */
      'angularMoment',
      'LocalForageModule',
      'ui.materialize',
      'ui.mask',
      'angularPayments',
      'ngFileUpload'
    ]);

})();
