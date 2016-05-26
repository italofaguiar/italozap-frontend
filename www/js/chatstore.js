angular.module('italoZap.chatstore', ['italoZap.apiUrlProvider'])
  .factory('ChatStore', function ($http, apiUrlProvider) {

    return {
      pushMessage: function (roomId, message) {
        return $http.post(apiUrlProvider.getUrl() + '/rooms/' + roomId + '/pushMessage' , message);
      }

    };

  });



