'use strict';

var path = require('path');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: '0.0.0.0',

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports =  all;
