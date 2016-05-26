angular.module('myzap.backendProvider', [])
  .service('backendProvider', function () {
    this.getUrl = function() {
      return 'http://ws.tocae.com.br';
    }
  });
