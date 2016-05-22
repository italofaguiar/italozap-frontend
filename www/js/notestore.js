angular.module('mynotes.notestore', [])
  .factory('NoteStore', function ($http) {

    var notes = angular.fromJson(window.localStorage['notes'] || '[]');

    //var apiUrl = 'https://notas-italo-backend.herokuapp.com';
    // var apiUrl = 'http://ws.tocae.com.br';
    //var apiUrl = 'http://192.168.0.195:8200';
    var apiUrl = 'http://localhost:8300';

    return {

      list: function () {
        return $http.get(apiUrl + '/notes/').then(function (response) {
          return response.data;
        });
      },

      get: function (noteId) {
        return $http.get(apiUrl + '/notes/' + noteId).then(function (response) {
          return response.data[0];
        });
      },

      create: function (note) {
        return $http.post(apiUrl + '/notes/', note);
      },

      update: function (note) {
        return $http.put(apiUrl + '/notes/' + note._id, note);
      },

      remove: function (noteId) {
        return $http.delete(apiUrl + '/notes/' + noteId);
      },

      removeAll: function () {
        return $http.delete(apiUrl + '/notes/all');
      },

      move: function (note, fromIndex, toIndex) {
        // TODO
      }

    };

  });



