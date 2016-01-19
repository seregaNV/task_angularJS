(function() {
    'use strict';
    function closeEditingDir() {
        var keys = {
            escape: 27
        };
        return {
            scope: {
                isEditing: '='
            },
            link: function(scope, element, attrs) {
                element.on('keyup', function(e) {
                    if (e.keyCode === keys.escape) {
                        scope.isEditing = false;
                        scope.$apply();
                    }
                })
            }
        }
    }
    angular.module('phonecatApp').directive('closeEditingDir', closeEditingDir);
})();