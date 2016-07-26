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
        if(!$scope.roomConnect)$ionicSideMenuDelegate.toggleLeft()
        $scope.roomConnect = true
        $scope.$apply()
        $scope.eState = data
        console.log($scope.eState);
        $scope.$apply();

    })
  }

  function searchState (search) {
    if (search.length === 0) search = false
    sendPath({command: 'search', fill: search, from: 'socket'})
  }



  function sendPath (path) {
    socket.emit('server', {info: path, room: socketRoom, to: 'electron'})
  }

})
