(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('memberCard', memberCard);

  /* @ngInject */
  function memberCard() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/widgets/memberCard.html',
      scope: {},
      bindToController: {
        firstName: '=',
        lastName: '=',
        face: '='
      },
      controller: Controller,
      controllerAs: 'dm'
    };

    return directive;

  }

  /* @ngInject */
  function Controller(){
    var dm = this;
  }
})();
