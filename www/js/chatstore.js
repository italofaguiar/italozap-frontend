angular.module('italoZap.chatstore', ['italoZap.backendService'])
  .factory('ChatStore', function ($http, backendService) {

    return {
      pushMessage: function (roomId, message) {
        return $http.post(backendService.getUrl() + '/rooms/' + roomId + '/pushMessage' , message);
      }

    };

  });



