(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('Auth', AuthService);

  /* @ngInject */
  function AuthService($window, $q, $http, $state, $cookies, $localForage, Raygun, Change) {
    var service = {
      login: login,
      forgot: forgot,
      reset: reset,
      logout: logout,
      verifyUserInfo: verifyUserInfo,
      saveAuthInfo: saveAuthInfo,
      destroyAuthInfo: destroyAuthInfo
    };

    return service;

    function reset(request) {
      var deferred = $q.defer();

      if (!request) {
        deferred.reject('Invalid Email Details');
      }

      var credentials = {
        email: request.email,
        token: request.token,
        newPassword: request.password
      };

      $http
        .post('api/v1/reset-password', credentials)
        .then(deferred.resolve)
        .catch(deferred.reject);

      return deferred.promise;
    }

    function forgot(email) {
      var deferred = $q.defer();

      if(typeof email === 'object') {
        if (email.email) {
          email = email.email;
        } else {
          deferred.reject('Invalid Email Details');
        }
      } else if (!email) {
        deferred.reject('Invalid Email Details');
      }

      var credentials = {
        email: email
      };

      $http
        .post('api/v1/send-password-token', credentials)
        .then(deferred.resolve)
        .catch(deferred.reject);

      return deferred.promise;
    }

    function login(email, password) {
      var deferred = $q.defer();

      if(typeof email === 'object') {
        if (email.email && email.password) {
          password = email.password;
          email    = email.email;
        } else {
          deferred.reject('Invalid Login Details');
        }
      } else if (!email || !password) {
        deferred.reject('Invalid Login Details');
      }

      var credentials = {
        loginEmail:     email,
        loginPassword:  password
      };

      $http
        .post('api/v1/signin', credentials)
        .then(function(res) {
          $http.defaults.headers.common.Authorization = 'Bearer ' + res.data.token;

          deferred.resolve(res.data || {});
        })
        .catch(deferred.reject);

      return deferred.promise;
    }

    function verifyUserInfo(user) {

      if (!user.company || user.company.length === 0)
        return false;

      var profileInfoValidators = [
        'gender',
        'details.contact_phone',
        'details.street',
        'details.city',
        'details.state',
        'details.zip_code',
        'details.birthday',
        'details.employer',
        'details.position'
      ];

      var creditCardValidators = [
        'sale.stripe_customer_id'
      ];

      if(!Change.validate(user, profileInfoValidators))
        return 'info';

      if(!Change.validate(user, creditCardValidators))
        return 'credit-card';

      //There are no problems with the user and login may procede uninterrpted
      return false;
    }

    function saveAuthInfo(user) {
      var deferred = $q.defer();

      var userString = JSON.stringify(user);

      $cookies.put('magnisesId', user._id);

      Raygun
        .user(user)
        .then(function() {
          return $localForage.setItem('currentUser', user);
        })
        .then(deferred.resolve)
        .catch(deferred.resolve);

      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      destroyAuthInfo()
        .then(function() {
          $state.go('login');
        });

      return deferred.promise;
    }

    function destroyAuthInfo() {
      $cookies.remove('magnisesId');
      return $localForage.removeItem('currentUser');
    }
  }
})();
