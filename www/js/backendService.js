angular.module('italoZap.backendService', [])
  .factory('backendService', function () {

    //var apiUrl = 'http://ws.tocae.com.br';
    var apiUrl = 'http://192.168.0.18:8300';
    var socketIo = io(apiUrl);

    return {
      getUrl: function () {
        return apiUrl;
      },

      getSocketIo: function () {
        return socketIo;
      }
    }
  });
