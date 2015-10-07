angular.module('StarterApp').controller('DialogController', function($scope, $mdDialog){
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(message) {
    $mdDialog.hide(message);
  };	
})
function DialogController() {
  
};
