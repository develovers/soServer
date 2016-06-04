angular.module('StarterApp').controller('AppController',
    function(
        $scope, $mdBottomSheet, $mdDialog, socketio, $q) {

        $scope.activity = [{
            message: 'Hey there, I am using develoverschat!',
            who: 'David',
            lat: 42.2345,
            lon: -5.634
        }, {
            message: 'Tengo hambre',
            who: 'Ivan',
            lat: 42.2345,
            lon: -5.634
        }, {
            message: 'Voy a unirme a los Develovers',
            who: 'Herve',
            lat: 42.2345,
            lon: -5.634
        }, ];
        $scope.alert = '';
        $scope.showListBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'app/list-bottom-sheet/list-bottom-sheet.html',
                controller: 'ListBottomSheetController',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };

        $scope.showAdd = function(ev) {
            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'app/dialog/modal-add.html',
                targetEvent: ev,
            }).then(prepareMessage, sendMessageError);
        };

        function prepareMessage(result) {
            getGeolocation().then(
                function(geolocation) {
                    var actv = {
                        message: result.message,
                        who: result.user,
                        lat: geolocation.coords.latitude,
                        lon: geolocation.coords.longitude
                    }
                    sendMessage(actv)
                }
            );
        }

        function addMessage(json) {
            $scope.activity.push(json);
        }

        function sendMessage(json) {
            console.log("SENDMESSAGE");

            console.log(json);
            socketio.emit('activity', json);
        }

        function getGeolocation() {
            var deferred = $q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        deferred.resolve(position);
                    },
                    function() {
                        var json = {
                            coords: {
                                latitude: 0.0,
                                longitude: 0.0
                            }
                        }
                        deferred.resolve(json);
                    }
                );
            }
            return deferred.promise;
        }


        function sendMessageError() {
            console.log('Cancelled');
            $scope.alert = 'You cancelled the dialog.';
        }

        socketio.on('activity', addMessage);

    });
