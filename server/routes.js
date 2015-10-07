'use strict';


var path = require('path');
module.exports = function(app) {



    app.get('/', function(req, res) {
        res.sendFile(path.resolve(app.get('appPath')) + '/index.html');
    });
    // All other routes should redirect to the index.html

};
