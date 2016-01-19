(function() {
    'use strict';
    function listsCtrl(ListFactory) {
        this.lists = ListFactory.getLists();
        this.addList = function() {
            if (this.listName) {
                ListFactory.addList(this.listName);
                this.listName = '';
            }
        };
    }
    function listCtrl(ListFactory, CardFactory) {
        this.removeList = function(list) {
            ListFactory.removeList(list);
        };
        this.getCards = function(list) {
            return CardFactory.getCards(list);
        };
        this.createCard = function(list) {
            CardFactory.createCard(list, this.cardDescription);
            this.cardDescription = '';
        }

    }
    function cardCtrl(CardFactory) {
        this.isEditing = false;
        this.editingCard = null;
        this.deleteCard = function(card) {
            CardFactory.deleteCard(card);
        };
        this.editCard = function(card) {
            this.isEditing = true;
            this.editingCard = angular.copy(card);
        };
        this.updateCard = function() {
            CardFactory.updateCard(this.editingCard);
            this.editingCard = null;
            this.isEditing = false;
        };
    }
    angular.module('phonecatApp')
        .controller('ListsCtrl', ['ListFactory', listsCtrl])
        .controller('ListCtrl', ['ListFactory', 'CardFactory', listCtrl])
        .controller('CardCtrl', ['CardFactory', cardCtrl]);
})();