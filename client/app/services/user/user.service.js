(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('User', UserService);

  /* @ngInject */
  function UserService($q, $http, Upload) {
    var service = {
      uploadAvatar: uploadAvatar,
      update: update,
      getCurrent: getCurrent,
      getCompany: getCompany
    };

    return service;

    function getCompany(user, image) {
      var deferred = $q.defer();

      if (!user.company) {
        return $q.resolve(false);
      }

      var companyId = user.company._id || user.company;

      $http.get('api/v1/company/' + companyId)
        .then(function(res) {
          console.log(res);
          deferred.resolve(res.data || {});
        })
        .catch(deferred.reject);

      return deferred.promise;
    }

    function uploadAvatar(user, image) {
      var deferred = $q.defer();

      Upload
        .base64DataUrl(image)
        .then(function(data) {

          var file = {};

          file.key = user._id;
          file.name = image.name;
          file.type = 'base64';
          file.source = data;

          return $q.resolve(file);

        })
        .then(function(file) {
          return $http.post('api/v1/users/' + user._id + '/image', file);
        })
        .then(function(){
          return $http.get('api/v1/users/' + user._id + '/profile');
        })
        .then(function(res) {
          console.log(res);
          deferred.resolve(res.data || {});
        })
        .catch(deferred.reject);

      return deferred.promise;
    }

    function update(user) {
      var deferred = $q.defer();

      var update = JSON.parse(JSON.stringify(user));

      if(update.details && typeof update.details.birthday === 'string') {
        var birthday = user.details.birthday;
        var month = birthday.substring(0, 2);
        var day   = birthday.substring(2, 4);
        var year  = birthday.substring(4, birthday.length);

        update.details.birthday = new Date(month + '/' + day + '/' + year);
      }

      delete update.token;

      $http
        .put('api/v1/users/' + user._id, update)
        .then(function(res) {
          return $http.get('api/v1/users/' + user._id + '/acceptApplicant');
        })
        .then(function(res) {
          console.log(res);
          deferred.resolve(res.data || {});
        })
        .catch(deferred.reject);

      return deferred.promise;
    }

    function getCurrent() {
      return $localForage.getItem('currentUser');
    }

  }
})();
