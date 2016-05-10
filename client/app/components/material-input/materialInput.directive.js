(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('materialInput', materialInput);

  /* @ngInject */
  function materialInput() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/widgets/materialInput.html',
      scope: {},
      bindToController: {
        model: '=ngModel',
        name: '@',
        type: '@',
        label: '@',
        required: '=',
        pattern: '@',
        validate: '=',
        placeholder: '@',
        minLength: '@',
        maxLength: '@',
        disabled: '='
      },
      controller: function() {},
      controllerAs: 'dm',
      link: link
    };

    return directive;

    function link(scope, element) {
      var input = element.find('input')[0];

      if (typeof scope.dm.pattern === 'string') {
        input.pattern = scope.dm.pattern;
      }

      if (typeof scope.dm.placeholder === 'string') {
        input.placeholder = scope.dm.placeholder;
      }

      scope.$watch('dm.pattern', function(value) {
        if (typeof value === 'string') {
          input.pattern = value;
        }
      });

      scope.$watch('dm.placeholder', function(value) {
        if (typeof value === 'string') {
          input.placeholder = value;
        }
      });
    }
  }
})();
