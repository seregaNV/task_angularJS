(function() {
    'use strict';
    function phoneListCtrl($scope, Phone) {
        $scope.phones = Phone.query();
        $scope.orderProp = 'age';
    }
    function aboutCtrl($scope) {
    }
    function contactCtrl($scope) {
    }
    function phoneDetailCtrl($scope, $routeParams, Phone) {
        $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
            $scope.mainImageUrl = phone.images[0];
        });

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    }
    function simpleAngularCtrl($scope, eF) {
        $scope.show = false;
        $scope.data = eF.arr;
        $scope.click = function() {
            var inputQuery = $scope.name,
                index = $scope.data.indexOf(inputQuery);
            if (inputQuery && (index === -1)) {
                $scope.data.push(inputQuery);
                console.log('"' + inputQuery + '" is added.');
                console.log('arr: ', $scope.data);
            } else if (inputQuery) {
                console.log('"' + inputQuery + '" is already exists!');
            } else {
                console.log('Input is empty!');
            }
        };
        $scope.remove = function(item) {
            var index = $scope.data.indexOf(item);
            $scope.data.splice(index, 1);
            console.log('"' + item + '" is removed.');
            console.log('arr: ', $scope.data);
        };
    }
    function phonebookCtrl($scope, Company) {
        $scope.companys = Company.query();
        $scope.view = 'list';
    }
    angular.module('phonecatApp')
        .controller('PhoneListCtrl', ['$scope', 'Phone', phoneListCtrl])
        .controller('AboutCtrl', ['$scope', aboutCtrl])
        .controller('ContactCtrl', ['$scope', contactCtrl])
        .controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone', phoneDetailCtrl])
        .controller('PhonebookCtrl', ['$scope', 'Company', phonebookCtrl])
        .controller('SimpleAngularCtrl', ['$scope', 'simpleFactory', simpleAngularCtrl]);
})();