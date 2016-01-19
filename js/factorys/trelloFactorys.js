(function() {
    'use strict';
    var lists = [
        {id: 1, listName: 'Todo'},
        {id: 2, listName: 'Doing'},
        {id: 3, listName: 'Done'}
    ];
    var cards = [
        {
            id: 1,
            description: 'Finish that task',
            list_id: 1
        },
        {
            id: 2,
            description: 'To begin next task',
            list_id: 1
        },
        {
            id: 3,
            description: 'Learn AngularJS',
            list_id: 2
        },
        {
            id: 4,
            description: 'Have breakfast',
            list_id: 3
        }
    ];
    function getId(arr) {
        var id, allId = [];
        for (var i = 0; i < arr.length; i++) {
            allId.push(arr[i].id);
        }
        id = Math.max.apply(null, allId) + 1;
        if (id == '-Infinity') {
            id = 1;
        }
        return id;
    }
    function listFactory() {
        var service = {};
        service.getLists = function() {
            return lists;
        };
        service.addList = function(listName) {
            lists.push({id: getId(lists), listName: listName});
        };
        service.removeList = function(list) {
            var index = lists.indexOf(list);
            lists.splice(index, 1);
            for (var i = cards.length - 1; i >= 0; i--) {
                if (cards[i].list_id == list.id) {
                    cards.splice(i, 1);
                }
            }
        };
        return service;
    }
    function cardFactory() {
        var service = {};
        service.getCards = function(list) {
            /*-------------------------------------------------------???*/
            var selectedCards = [];
            for (var i = 0; i < cards.length; i++ ) {
                if (cards[i].list_id === list.id) {
                    selectedCards.push(cards[i]);
                }
            }
            return selectedCards;
        };
        service.createCard = function(list, cardDescription) {
            if (cardDescription) {
                cards.push({
                    id: getId(cards),
                    description: cardDescription,
                    list_id: list.id
                });
            }
        };
        service.deleteCard = function(card) {
            var index = cards.indexOf(card);
            cards.splice(index, 1);
        };
        service.updateCard = function(updatingCard) {
            var card = {};
            for (var i = 0; i < cards.length; i++ ) {
                if (cards[i].id === updatingCard.id) {
                    card = cards[i];
                }
            }
            card.description = updatingCard.description;
            card.list_id = updatingCard.list_id;
        };
        return service;
    }
    angular.module('phonecatApp')
        .factory('ListFactory', listFactory)
        .factory('CardFactory', cardFactory);
})();