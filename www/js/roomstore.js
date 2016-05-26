angular.module('italoZap.roomstore', ['italoZap.apiUrlProvider'])
  .factory('RoomStore', function ($http, apiUrlProvider) {

    var apiUrl = apiUrlProvider.getUrl();
    
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



