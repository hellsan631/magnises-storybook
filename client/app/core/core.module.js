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
      /* 3rd Party Modules */
      'angularMoment',
      'LocalForageModule',
      'permission',
      'ui.materialize',
      'ui.router',
      'anim-in-out',
      'angularPayments',
      'uiRouterStyles',
      'ui.mask',
      'ngFileUpload'
    ]);

})();
