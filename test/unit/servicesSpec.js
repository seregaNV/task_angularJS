'use strict';

describe('SimpleFactory', function () {
    var factory;
    beforeEach(function() {
        module('phonecatApp');
        inject(function($injector) {
            factory = $injector.get('SimpleFactory')
        });

    });
    describe('SimpleFactory', function() {
        it('should be array with some elements', function() {
            expect(factory.arr).toEqual(['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'NodeJS', 'ExpressJS']);
        });
        it('should be array with 7 elements', function() {
            expect(factory.arr.length).toBe(7);
        });
    });
});