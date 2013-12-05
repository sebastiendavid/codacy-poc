'use strict';

// Import globals
// **************
var _ = window._; // prevent jshint error
var moment = window.moment; // prevent jshint error


// Path
// ****
var initScreenSize = function (width, height) {
    casper.then(function () {
        casper.viewport(width || 1600, height || 1200);
        casper.wait(200); // Hint: wait needed after resize (black screen if not with tests failed)
    });
};

casper.home = function () {
    casper.start('http://localhost:' + casper.cli.options.port + '/index.html');
    initScreenSize();
    casper.then(function () {
        this.waitForText('Hello!');
    });
};

// Common interactions
// *******************



// Utilities
// *********

// Captures
casper.captureOK = function () {
    casper.capture('./target/casperjs/' + moment().format('YYYYMMDD-HHmmssSSS') + '.jpg');
};

casper.captureError = function () {
    casper.capture('./target/casperjs/' + moment().format('YYYYMMDD-HHmmssSSS') + '-error.jpg');
};

// Mouse
casper.mouseEnter = function (selector) {
    casper.evaluate(function (selector) {
        $(selector).trigger('mouseenter');
    }, selector);
};

casper.thenMouseEnter = function (selector) {
    casper.then(function thenMouseEnter() {
        casper.mouseEnter(selector);
    });
};

casper.mouseLeave = function (selector) {
    casper.evaluate(function (selector) {
        $(selector).trigger('mouseleave');
    }, selector);
};

casper.thenMouseLeave = function (selector) {
    casper.then(function thenMouseLeave() {
        casper.mouseLeave(selector);
    });
};

casper.position = function (selector, addLeft, addTop) {
    return casper.evaluate(function (selector, addLeft, addTop) {
        var element = $(selector).offset();
        return { left: element.left + addLeft, top: element.top + addTop };
    }, selector, addLeft || 0, addTop || 0);
};

// Drag and drop
casper.drag = function (fromSelector, toSelector, options, callback) {
    if (_.isFunction(options)) {
        callback = options;
        options = {};
    }
    var fromPosition = casper.position(fromSelector, options.addFromLeft, options.addFromTop);
    var toPosition = casper.position(toSelector, options.addToLeft, options.addToTop);
    this.mouse.down(fromPosition.left, fromPosition.top);
    this.mouse.move(toPosition.left, toPosition.top);
    this.wait(options.wait || 300, callback);
};

casper.move = function (toSelector, options, callback) {
    if (_.isFunction(options)) {
        callback = options;
        options = {};
    }
    var toPosition = casper.position(toSelector, options.addToLeft, options.addToTop);
    this.mouse.move(toPosition.left, toPosition.top);
    this.wait(options.wait || 300, callback);
};

casper.drop = function (toSelector, options, callback) {
    if (_.isFunction(options)) {
        callback = options;
        options = {};
    }
    var toPosition = casper.position(toSelector, options.addToLeft, options.addToTop);
    this.mouse.move(toPosition.left, toPosition.top);
    this.wait(options.wait || 300, function thenDragAndDrop() {
        this.mouse.up(toPosition.left, toPosition.top);
        this.wait(options.wait || 300, callback);
    });
};

casper.dragAndDrop = function (fromSelector, toSelector, options, callback) {
    if (_.isFunction(options)) {
        callback = options;
        options = {};
    }
    var fromPosition = casper.position(fromSelector, options.addFromLeft, options.addFromTop);
    var toPosition = casper.position(toSelector, options.addToLeft, options.addToTop);
    this.mouse.down(fromPosition.left, fromPosition.top);
    this.mouse.move(toPosition.left, toPosition.top);
    this.wait(options.wait || 300, function thenDragAndDrop() {
        this.mouse.up(toPosition.left, toPosition.top);
        this.wait(options.wait || 300, callback);
    });
};

// Counter
casper.counter = function (selector, count) {
    return casper.evaluate(function (selector, count) {
        return $(selector).length === count;
    }, selector, count);
};

casper.counterAsFunction = function (selector, count) {
    return function () {
        return casper.counter(selector, count);
    };
};

// Events
// ******

casper.on('step.error', casper.captureError);
casper.on('waitFor.timeout', casper.captureError);
