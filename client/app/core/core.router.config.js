
;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(RouterConfig);

  /* @ngInject */
  function RouterConfig($state, $rootScope, $timeout) {
    var stateloaded = false;

    $rootScope.$on('$stateChangeStart', function(event, to, params) {
      if (to.redirectTo) {
        event.preventDefault();
        $state.go(to.redirectTo, params);
      }

      if(stateloaded) {
        startAnimations();
      } else {
        stateloaded = true;
      }
    });

    function startAnimations() {
      $rootScope.$on('animStart', function($event, element, speed) {

        $timeout(function() {
          var pos = $('body').scrollTop();

          if(pos > 10) {
            $('html, body').animate({ scrollTop: 0 }, 200);
          }
        }, 16);
      });
    }
  }

})();
