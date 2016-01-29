(function() {
    'use strict';
    function phoneListCtrl($scope, PhoneFactory) {

        //$scope.phones = PhoneFactory.query();
        PhoneFactory.query({}, function(data) {
            $scope.phones = data;
            $scope.quant = $scope.phones.length;
            $scope.changeData = function() {
                var companys = [];
                for (var i = 0; i < data.length; i++) {
                    if ((((data[i].name.indexOf($scope.search)) != -1) || !$scope.search) && (data[i].status || !$scope.show)) {
                        companys.push(data[i]);
                    }
                }
                $scope.phones = companys;
                $scope.quant = $scope.phones.length;
            };
        });
        $scope.orderProp = 'age';
    }
    function phoneDetailCtrl($scope, $stateParams, PhoneFactory) {
        $scope.phone = PhoneFactory.get({phoneId: $stateParams.phoneId}, function(phone) {
            $scope.mainImageUrl = phone.images[0];
        });

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    }
    angular.module('phonecatApp')
        .controller('PhoneListCtrl', ['$scope', 'PhoneFactory', phoneListCtrl])
        .controller('PhoneDetailCtrl', ['$scope', '$stateParams', 'PhoneFactory', phoneDetailCtrl]);
})();