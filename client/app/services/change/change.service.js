(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('Change', ChangeService);

  /* @ngInject */
  function ChangeService() {
    var service = {
      summerize: summerizeChanges,
      containsUndefined: containsUndefined,
      validate: validateObject
    };

    return service;

    /**
     * Takes an object and verifies that specific fields are non-false/null values.
     * (inputs come from a form field) Does this recursively.
     * Example:
       var obj = {
         hello: 'world',
         your: {
           doom: 'chicken'
         },
         ache: null //validates as false
       };

       Change
        .validate(
          obj,
          [
            'hello',
            'your.doom',
            'ache.back' //will not validate
          ]
        ); //resolves to false because ache is false
     */
    function validateObject(obj, fields) {
      if(!obj || !fields) {
        return false;
      }

      var check = true;
      for (var i = 0; i < fields.length; i++) {
        if (fields[i].indexOf('.') > -1) {
          check = validateObject(obj[fields[i].split('.')[0]], [fields[i].split('.')[1]]);
        } else if(!obj[fields[i]]) {
          return false;
        }

        if(!check) {
          return false;
        }
      }

      return check;
    }

    /**
     * Gets Changes between two sets of objects. changes are pushed as an array
     * of values (not keys). This is so that we can easily chain containsUndefined.
     */

    function summerizeChanges(data, old) {
      var changes = [];

      if(data && old) {
        for (var key in data) {
          if(key !== 'id' && key !== '_id'){
            if (typeof data[key] === 'object') {
              var objectChanges = summerizeChanges(data[key], old[key]);
              changes = changes.concat(objectChanges);
            } else if(data[key] !== old[key]) {
              changes.push(data[key]);
            }
          }
        }
      }

      return changes;
    }

    function containsUndefined(array) {
      for (var i = 0; i < array.length; i++) {
        if (typeof array[i] === 'undefined') {
          return true;
        } else if (typeof array[i] === 'string' && array[i].length === 0) {
          return true;
        }
      }

      return false;
    }

  }
})();
