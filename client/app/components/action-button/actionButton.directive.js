(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('actionButton', actionButton);

  /* @ngInject */
  function actionButton() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/widgets/actionButton.html',
      scope: {},
      bindToController: {
        defaultMessage: '@',
        loadingState: '=',
        loaderAnimation: '@',
        errorMessage: '@',
        successMessage: '@',
      },
      controller: function() {},
      controllerAs: 'dm'
    };

    return directive;
  }
})();
