;(function() {
  'use strict';

  angular
    .module('app', [
      /* Shared Modules */
      'app.core',
      'app.widgets',
      'app.layout',
      /* Content Modules */
      'app.apply',
      'app.login',
      'app.landing',
      'app.legal',
      'app.faq'
    ]);

})();
