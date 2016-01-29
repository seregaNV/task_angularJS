'use strict';

describe('Phone list view', function() {

    beforeEach(function() {
        browser.get('/#/phone-catalog');
    });


    //var phoneList = element.all(by.repeater('phone in phones').column('phone.name'));
    var phoneList = element.all(by.repeater('phone in phones'));
    var query = element(by.model('search'));
    it('should filter the phone list as a user types into the search box', function() {


        expect(phoneList.count()).toBe(20);

        query.sendKeys('Nexus');
        expect(phoneList.count()).toBe(1);

        query.clear();
        query.sendKeys('Motorola');
        expect(phoneList.count()).toBe(5);
    });

    it('should display the current filter value in the title bar', function() {
        expect(browser.getTitle()).toMatch('AngularJS');
    });

    //it('should be possible to control phone order via the drop down select box', function() {
    //    //let's narrow the dataset to make the test assertions shorter
    //    //input('search').enter('XOOM');
    //    query.sendKeys('XOOM');
    //    //repeater('#products table', 'Product List').column('product.name')
    //    expect(phoneList.column('phone.name')).
    //        toEqual(["MMotorola XOOM\u2122 with Wi-Fi",
    //            "MOTOROLA XOOM\u2122"]);
    //
    //    //select('orderProp').option('Alphabetical');
    //    //
    //    //expect(repeater('.phones li', 'Phone List').column('phone.name')).
    //    //    toEqual(["MOTOROLA XOOM\u2122",
    //    //        "Motorola XOOM\u2122 with Wi-Fi"]);
    //});
});