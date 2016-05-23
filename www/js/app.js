(function () {

  var app = angular.module('myzap', ['ionic', 'myzap.user', 'myzap.roomstore', 'ngTouch', 'ui.bootstrap']);

  app.controller('ListCtrl', function ($scope, RoomStore, $state, $ionicHistory, User) {

    $scope.user = window.localStorage['user'];
    $scope.reordering = false;
    $scope.$state = $state;

    $scope.doScreenRefresh = function () {
      refreshRooms()
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    function refreshRooms() {
      return RoomStore.list().then(function (rooms) {
        $scope.rooms = rooms;
      });
    };

    refreshRooms();

    $scope.remove = function (roomId) {
      RoomStore.remove(roomId).then(refreshRooms);
    };

    $scope.removeAll = function () {
      RoomStore.removeAll().then(refreshRooms);
    };

    $scope.move = function (room, fromIndex, toIndex) {
      RoomStore.move(room, fromIndex, toIndex);
    };

    $scope.toogleReordering = function () {
      $scope.reordering = !$scope.reordering;
    };

    $scope.logout = function () {
      User.logout();
      $ionicHistory.nextViewOptions({historyRoot: 'true'})
      $state.go('login');
    }

  });

  app.controller('AddCtrl', function ($scope, $state, RoomStore) {

    $scope.room = {
      // TODO : tirar essa dependencia de _id daqui!!
      _id: new Date().getTime().toString(),
      title: '',
      description: ''
    };

    $scope.save = function () {
      RoomStore.create($scope.room).then(function () {
        $state.go('list');
      });
    };
  });

  app.controller('EditCtrl', function ($scope, $state, RoomStore) {

    RoomStore.get($state.params.roomId)
      .then(function (room) {
        $scope.room = angular.copy(room);
      });

    $scope.save = function () {
      RoomStore.update($scope.room).then(function () {
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
            window.localStorage['user'] = $scope.credentials.user;
            $ionicHistory.nextViewOptions({historyRoot: 'true'});
            $state.go('list');
          },
          function () {
            renewCredentials();
            $scope.errorMsg = "Sign in failed"
          });
    };

    $scope.signup = function () {
      User.signup($scope.credentials)
        .then(function () {
            window.localStorage['user'] = $scope.credentials.user;
            $ionicHistory.nextViewOptions({historyRoot: 'true'})
            $state.go('list');
          },
          function () {
            renewCredentials();
            $scope.errorMsg = "Sign up failed"
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
        url: '/edit/:roomId',
        templateUrl: 'templates/edit.html',
        controller: 'EditCtrl'
      }
    ).state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        cache: false
      }
    );
    $urlRouterProvider.otherwise('/');
  });

  app.run(function ($rootScope, $state, $ionicPlatform, $ionicHistory, User) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      User.checkIfLogged().then(function (isLoggedIn) {
        if (!isLoggedIn && toState.name != 'login') {
          event.preventDefault();
          $ionicHistory.nextViewOptions({historyRoot: 'true'});
          $state.go('login');
        }
      });
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
