angular.module('mynotes.user', [])
  .factory('User', function ($http) {

    var apiUrl = 'http://localhost:8200';

    return {

      login: function (credentials) {
        return $http.post(apiUrl + '/authenticate', credentials)
          .then(function (response) {
            var auth = 'Bearer ' + response.data.token;
            $http.defaults.headers.common.Authorization = auth;
            window.localStorage['auth'] = auth;
          });
      },

      checkIfLogged: function () {
        var auth = window.localStorage['auth'];
        $http.defaults.headers.common.Authorization = auth;
        return $http.get(apiUrl + '/notes/').then(
          function (response) {
            if (response.status == 200) {
              return true;
            }
            return false;
          },
          function () {
            return false;
          })
      }
    }
  });
