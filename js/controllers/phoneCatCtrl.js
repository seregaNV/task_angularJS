(function() {
    'use strict';
    function phoneListCtrl($scope, Phone) {
        $scope.phones = Phone.query();
        $scope.orderProp = 'age';
        //for (var key in $scope.phones.$promise) {
        //    console.log(property);
        //}
        //console.log($scope.phones.$promise.$$state);
    }
    function phoneDetailCtrl($scope, $stateParams, Phone) {
        $scope.phone = Phone.get({phoneId: $stateParams.phoneId}, function(phone) {
            $scope.mainImageUrl = phone.images[0];
        });

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    }
    angular.module('phonecatApp')
        .controller('PhoneListCtrl', ['$scope', 'Phone', phoneListCtrl])
        .controller('PhoneDetailCtrl', ['$scope', '$stateParams', 'Phone', phoneDetailCtrl]);
})();