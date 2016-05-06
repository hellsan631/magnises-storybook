//External Lib Constants

/* global swal:false, toastr:false, Stripe:false  */
;(function() {

  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('swal', swal);

})();
