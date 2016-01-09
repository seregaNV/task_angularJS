"use strict";
$(document).ready(function(){
    $('body').scrollspy({
        target: '.bs-docs-sidebar',
        offset: 30
    });
    $(".affix-css").affix({
        offset: {
            top: 50
        }
    });
});