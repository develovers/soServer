/**
 * Express configuration
 */

'use strict';

var express = require('express');
var path = require('path');
var config = require('./');

module.exports = function(app) {
    var env = app.get('env');
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
};