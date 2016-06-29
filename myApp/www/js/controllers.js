var socketRoom;
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
  var url = 'https://fathomless-falls-33454.herokuapp.com/'
  var socket = io.connect(url);
  $scope.setRoom = setRoom;
  $scope.roomConnect = false;
  $scope.sendPath = sendPath;

  function setRoom(room) {
    socketRoom = room
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
        console.log(data);
        $scope.musicInfo = data
        $scope.$apply();
      }
    })
  }



  function sendPath (path) {
    socket.emit('server', {info: path, room: socketRoom, to: 'electron'})
  }

})
