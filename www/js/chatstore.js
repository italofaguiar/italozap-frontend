angular.module('myzap.chatstore', [])
  .factory('ChatStore', function ($http) {

    //var apiUrl = 'https://notas-italo-backend.herokuapp.com';
    var apiUrl = 'http://ws.tocae.com.br';
    //var apiUrl = 'http://192.168.0.195:8200';
    // var apiUrl = 'http://192.168.0.18:8300';

    return {

      pushMessage: function (roomId, message) {
        return $http.post(apiUrl + '/rooms/' + roomId + '/pushMessage' , message);
      }

    };

  });



