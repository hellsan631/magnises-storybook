;(function() {
  'use strict';

  angular
      .module('blocks.logger')
      .factory('logger', logger);

  /* @ngInject */
  function logger($log, toastr, Raven) {
    var service = {
      showToasts: true,
      showErrors: false,

      error   : error,
      info    : info,
      success : success,
      warning : warning,

      // straight to console; bypass toast
      log     : $log.log,

      // add raven integration
      captureMessage: captureMessage
    };

    return service;
    /////////////////////

    function error(message, data) {
      if(typeof message === 'object'){
        message = message.statusText || 'An error has occured';
      }

      if (service.showToasts && service.showErrors) {
        toastr.error(message, 'Error');
      }

      $log.error('Error: ' + message, data);
      captureMessage(message, data);
    }

    function info(message, data) {
      if (service.showToasts) {
        toastr.info(message, 'Information');
      }

      $log.info('Info: ' + message, data);
    }

    function success(message, data) {
      if (service.showToasts) {
        toastr.success(message, 'Success');
      }

      $log.info('Success: ' + message, data);
    }

    function warning(message, data) {
      if (service.showToasts) {
        toastr.warning(message, 'Warning');
      }

      $log.warn('Warning: ' + message, data);
    }

    function captureMessage(message, data) {
      var ravenOpts = {
        logger: 'logger.service'
      };

      if (data) {
        ravenOpts.extra = { data: data };
      }

      Raven.captureMessage(new Error(message), ravenOpts);
    }
  }
}());
