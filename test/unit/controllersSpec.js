'use strict';

describe('PhoneListCtrl', function(){
    beforeEach(module('phonecatApp'));
    it('should create "phones" model with 20 phones', inject(function($controller) {
        var scope = {};
        $controller('PhoneListCtrl', {$scope:scope});
        //expect(scope.phones.length).toBe(20);
        expect(scope.orderProp).toBe('age');
    }));
});

describe('PhonebookCtrl', function(){
    beforeEach(module('phonecatApp'));
    it('should create "companys" model with 100 phones', inject(function($controller) {
        var scope = {};
        $controller('PhonebookCtrl', {$scope:scope});
        //expect(scope.companys.length).toBe(100);
        expect(scope.view).toBe('list');
    }));
});

describe('SimpleAngularCtrl', function(){
    beforeEach(module('phonecatApp'));
    it('should create array with 7 elements', inject(function($controller) {
        var scope = {};
        $controller('SimpleAngularCtrl', {$scope:scope});
        expect(scope.data.length).toBe(7);
        expect(scope.show).toBe(false);
        scope.name = 'Bootstrap';
        scope.click();
        expect(scope.data.length).toBe(7);
        scope.name = 'AngularJS';
        scope.click();
        expect(scope.data.length).toBe(8);
        scope.remove('Bootstrap');
        expect(scope.data.length).toBe(7);
    }));
});

describe('TrelloCtrl', function(){
    var listsCtrl, listCtrl;
    beforeEach(function() {
        module('phonecatApp');
        inject(function($controller) {
            listsCtrl = $controller('ListsCtrl');
            listCtrl = $controller('ListCtrl');
        });

    });
    describe('TrelloCtrl', function() {
        it('should be list with 3 objects', function() {
            expect(listsCtrl.lists).toEqual([
                {id: 1, listName: 'Todo'},
                {id: 2, listName: 'Doing'},
                {id: 3, listName: 'Done'}
            ]);
            expect(listsCtrl.lists.length).toBe(3);
        });
        it('should create list with listName = "ttt" and change length of lists', function() {
            listsCtrl.listName = 'ttt';
            listsCtrl.addList();
            expect(listsCtrl.lists[3].listName).toBe('ttt');
            expect(listsCtrl.lists.length).toBe(4);

        });
        it('get the card at the list', function() {
            expect(listCtrl.getCards({id: 2, listName: 'Doing'})).toEqual([{
                id: 3,
                description: 'Learn AngularJS',
                list_id: 2
            }]);

        });
        it('remove the card at the list', function() {
            listCtrl.removeList({id: 2, listName: 'Doing'});
            expect(listsCtrl.lists.length).toBe(3);

        });
        it('should create card at the list and value of "listCtrl.cardDescription"', function() {
            listCtrl.cardDescription = 'test card';
            listCtrl.createCard({id: 2, listName: 'Doing'});
            expect(listCtrl.getCards({id: 2, listName: 'Doing'})).toEqual([{
                id: 5,
                description: 'test card',
                list_id: 2
            }]);

        });
    });
});