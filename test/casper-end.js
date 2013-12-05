'use strict';

casper.test.begin('Captures folder', function capturesFolder(test) {
    test.pass(' ');
    test.pass('*************************************************');
    test.pass('Open "msg-ui/target/casperjs" folder for captures');
    test.pass('*************************************************');
    test.pass(' ');
    casper.run(function () {
        test.done();
    });
});
