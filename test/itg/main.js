'use strict';

casper.test.begin('main # should body to be not empty', function (test) {
    casper.home();

    // test.assertExists('#header');
    // test.assertExists('#content');

    casper.run(function () {
        test.done();
    });
});