;(function() {
  'use strict';

  angular
    .module('app.components')
    .config(AppConfig);

  /* @ngInject */
  function AppConfig($stateProvider) {

    $stateProvider
      .state({
        name: 'components',
        url: '/components',
        views: {
          'main@': {
            templateUrl: 'app/components/components.html',
            controller: 'ComponentsController',
            controllerAs: 'vm'
          }
        }
      })
      //An example of a component state, where components is the child of that state
      .state({
        name: 'components.actionButton',
        url: '/action-button',
        views: {
          'main@': {
            templateUrl: 'app/components/action-button/actionButton.doc.html',
            controller: 'ActionButtonDocController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();
