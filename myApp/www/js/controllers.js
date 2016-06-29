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
