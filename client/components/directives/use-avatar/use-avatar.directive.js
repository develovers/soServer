angular.module('StarterApp').directive('userAvatar', function() {
  return {
    replace: true,
    templateUrl: 'components/directives/use-avatar/use-avatar.directive.html'
  };
});