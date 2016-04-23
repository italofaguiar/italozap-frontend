(function () {

  var app = angular.module('mynotes', ['ionic', 'mynotes.user', 'mynotes.notestore']);

  app.controller('ListCtrl', function ($scope, NoteStore) {

    $scope.reordering = false;


    $scope.doScreenRefresh = function () {
      refreshNotes()
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    function refreshNotes() {
      return NoteStore.list().then(function (notes) {
        $scope.notes = notes;
      });
    };

    refreshNotes();

    $scope.remove = function (noteId) {
      NoteStore.remove(noteId).then(refreshNotes);
    };

    $scope.removeAll = function () {
      NoteStore.removeAll().then(refreshNotes);
    };

    $scope.move = function (note, fromIndex, toIndex) {
      NoteStore.move(note, fromIndex, toIndex);
    };

    $scope.toogleReordering = function () {
      $scope.reordering = !$scope.reordering;
    }

  });

  app.controller('AddCtrl', function ($scope, $state, NoteStore) {

    $scope.note = {
      id: new Date().getTime().toString(),
      title: '',
      description: ''
    };

    $scope.save = function () {
      NoteStore.create($scope.note).then(function () {
        $state.go('list');
      });
    };
  });

  app.controller('EditCtrl', function ($scope, $state, NoteStore) {

    NoteStore.get($state.params.noteId)
      .then(function (note) {
        $scope.note = angular.copy(note);
      });

    $scope.save = function () {
      NoteStore.update($scope.note).then(function () {
        $state.go('list');
      });
    }

  });

  app.controller('LoginCtrl', function ($scope, $state, $ionicHistory, User) {

    function renewCredentials() {
      $scope.credentials = {
        user: '',
        password: ''
      };
    };

    renewCredentials();

    $scope.login = function () {
      User.login($scope.credentials)
        .then(function () {
            $ionicHistory.nextViewOptions({historyRoot: 'true'})
            $state.go('list');
          },
          function () {
            renewCredentials();
            $scope.errorMsg = "Login failed"
          });
    }

  });

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.//
    state('list', {
        url: '/',
        templateUrl: 'templates/list.html',
        cache: false
      }
    ).state('add', {
        url: '/add',
        templateUrl: 'templates/edit.html',
        controller: 'AddCtrl'
      }
    ).state('edit', {
        url: '/edit/:noteId',
        templateUrl: 'templates/edit.html',
        controller: 'EditCtrl'
      }
    ).state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    );
    $urlRouterProvider.otherwise('/');
  });

  app.run(function ($rootScope, $state, $ionicPlatform, User) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (!User.isLoggedIn() && toState.name != 'login') {
        event.preventDefault();
        $state.go('login');
      }
    });
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
})();
