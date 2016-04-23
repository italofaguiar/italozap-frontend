angular.module('mynotes.user', [])
  .factory('User', function ($http) {

    var apiUrl = 'http://ws.tocae.com.br';

    return {

      login: function (credentials) {
        return $http.post(apiUrl + '/authenticate', credentials)
          .then(function (response) {
            var auth = 'Bearer ' + response.data.token;
            $http.defaults.headers.common.Authorization = auth;
            window.localStorage['auth'] = auth;
          });
      },

      logout: function () {
            window.localStorage['auth'] = null;
      },

      signup: function (credentials) {
        return $http.post(apiUrl + '/authenticate/signup', credentials)
          .then(function (response) {
            var auth = 'Bearer ' + response.data.token;
            $http.defaults.headers.common.Authorization = auth;
            window.localStorage['auth'] = auth;
          });
      },

      checkIfLogged: function () {
        // TODO: nao precisa passar por aqui quando for um logout
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
