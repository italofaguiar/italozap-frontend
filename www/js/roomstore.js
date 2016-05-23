angular.module('myzap.roomstore', [])
  .factory('RoomStore', function ($http) {

    // TODO: para que isso??
    var rooms = angular.fromJson(window.localStorage['rooms'] || '[]');

    //var apiUrl = 'https://notas-italo-backend.herokuapp.com';
    // var apiUrl = 'http://ws.tocae.com.br';
    //var apiUrl = 'http://192.168.0.195:8200';
    var apiUrl = 'http://192.168.0.18:8300';

    return {

      list: function () {
        return $http.get(apiUrl + '/rooms/').then(function (response) {
          return response.data;
        });
      },

      get: function (roomId) {
        return $http.get(apiUrl + '/rooms/' + roomId).then(function (response) {
          return response.data[0];
        });
      },

      create: function (room) {
        return $http.post(apiUrl + '/rooms/', room);
      },

      update: function (room) {
        return $http.put(apiUrl + '/rooms/' + room._id, room);
      },

      remove: function (roomId) {
        return $http.delete(apiUrl + '/rooms/' + roomId);
      },

      removeAll: function () {
        return $http.delete(apiUrl + '/rooms/all');
      },

      move: function (room, fromIndex, toIndex) {
        // TODO
      }

    };

  });



