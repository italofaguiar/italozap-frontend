angular.module('myzap.chatstore', ['myzap.backendProvider'])
  .factory('ChatStore', function ($http, backendProvider) {

    return {
      pushMessage: function (roomId, message) {
        return $http.post(backendProvider.getUrl() + '/rooms/' + roomId + '/pushMessage' , message);
      }

    };

  });



