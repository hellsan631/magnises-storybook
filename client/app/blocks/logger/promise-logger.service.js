;(function() {
  'use strict';

  angular
      .module('blocks.logger')
      .factory('PromiseLogger', PromiseLogger);

  /* @ngInject */
  function PromiseLogger(swal, logger, $q, $rootScope) {
    var service = {
      showToasts: logger.showToasts,

      // List of promise log handers
      promiseError:   promiseError,
      successDialog:  successDialog,
      confirmDialog:  confirmDialog,
      errorDialog:    errorDialog,

      // bypass enhanced promise logger for non promise fallbacks
      error:   logger.error,
      info:    logger.info,
      success: logger.success,
      warning: logger.warning,
      log:     logger.log
    };

    return service;
    /////////////////////

    function promiseError(text, data) {
      logger.error(text, data);

      return $q(function quit(){return null;});
    }

    function successDialog(title, text) {
      var deferred = $q.defer();

      $rootScope.modalOpen = true;

      swal({
        title: title,
        text: text,
        type: 'success'
      }, resolve);

      attachKeyDown(resolve);

      deferred.promise
        .then(function(){
          $rootScope.modalOpen = false;
        });

      return deferred.promise;

      function resolve() {
        deferred.resolve();
      }
    }

    function errorDialog(title, text) {
      var deferred = $q.defer();

      $rootScope.modalOpen = true;

      swal({
        title: title,
        text: text,
        type: 'error'
      }, resolve);

      attachKeyDown(resolve);

      deferred.promise
        .then(function(){
          $rootScope.modalOpen = false;
        });

      return deferred.promise;

      function resolve() {
        deferred.resolve();
      }
    }

    function confirmDialog(title, text, successFn) {
      var deferred = $q.defer();

      $rootScope.modalOpen = true;

      swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffc823',
        confirmButtonText: 'Yes!',
        closeOnConfirm: true
      }, function confirmSuccess(confirm) {
        if(typeof successFn === 'function') {
          successFn(confirm);
        }

        resolve(confirm);
      });

      attachKeyDown(resolve);

      deferred.promise
        .then(function(){
          $rootScope.modalOpen = false;
        });

      return deferred.promise;

      function resolve(confirm) {
        deferred.resolve(confirm || false);
      }
    }

    function attachKeyDown(fn) {
      var check = setInterval(function() {
        if ($('.sweet-alert').hasClass('hideSweetAlert')) {
          callback();
        }
      }, 100);

      document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          callback();
        }
      };

      function callback() {
        document.onkeydown = null;
        clearInterval(check);
        fn();
      }
    }
  }
}());
