var socketRoom;
var state = {};
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
  var url = 'https://fathomless-falls-33454.herokuapp.com/'
  var socket = io.connect(url);
  $scope.setRoom = setRoom;
  $scope.roomConnect = false;
  $scope.sendPath = sendPath;
  $scope.orderBy = orderBy;
  $scope.searchState = searchState;

  function orderBy(by){
    $scope.by = by
    sendPath({command: 'state', order: by, from: 'socket'})
  }

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
        $scope.musicInfo = data
        console.log(data);
        $scope.$apply();
      }
    })
  }

  function searchState (search) {
    sendPath({command: 'search', fill: search, from: 'socket'})
  }



  function sendPath (path) {
    socket.emit('server', {info: path, room: socketRoom, to: 'electron'})
  }

})
