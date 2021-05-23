var assert = require('assert');
var loadJSON = require('./cb_JSON');

describe ('JSON test', function() {
    it ('good JSON', function (done){
        loadJSON('good.json', function (err, data) {
            done (err);
            assert.equal (data.name, "John");
        });
    });
   it ('bad JSON', function (done){
        loadJSON('bad.json', function (err, data) {
            if ((err instanceof Error) && (err.message == 'Bad JSON')) done ();
            else done (err);
        });
    });
    it ('nonexistent JSON', function (done){
        loadJSON('nonexist.json', function (err, data) {
            if ((err instanceof Error) && (err.code == 'ENOENT')) done ();
            else done (err);
        });
    });
    it.skip ('good JSON, bad callback', function (done){
        loadJSON('good.json', function (err, data) {
            if ((err instanceof Error) && (err.message == 'Test callback error')) done ();
            else done (err);
            throw new Error ("Test callback error");
        });
    
    });
})