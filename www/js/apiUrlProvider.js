angular.module('italoZap.apiUrlProvider', [])
  .service('apiUrlProvider', function () {
    this.getUrl = function() {
      return 'http://ws.tocae.com.br';
    }
  });
