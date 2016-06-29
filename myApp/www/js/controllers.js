angular.module('starter.controllers', [])

.factory('musicData', function () {
  var socketRoom;
  return {
    socketRoomSet,
  }

  function socketRoomSet (room){
    if (room) socketRoom = room
    return socketRoom
  }
})

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate, musicData) {
  var url = 'https://fathomless-falls-33454.herokuapp.com/'
  var socket = io.connect(url);
  $scope.setRoom = setRoom;
  $scope.roomConnect = false;
  $scope.sendPath = sendPath;

  function setRoom(room) {
    var socketRoom = musicData.socketRoomSet(room)
    socket.emit('server', {info: 'client wants data!', room: socketRoom, to: 'electron'})
    socket.on(socketRoom + 'client', function (data) {
      if (Array.isArray(data)) {
        if (data.length > 0){
          $scope.roomConnect = true
          $ionicSideMenuDelegate.toggleLeft()
          $scope.list = data;
          $scope.$apply()
        }
      } else {
        // console.log(data);
      }
    })
  }

  function sendPath (path) {
    var socketRoom = musicData.socketRoomSet()
    socket.emit('server', {info: path, room: socketRoom, to: 'electron'})
  }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
