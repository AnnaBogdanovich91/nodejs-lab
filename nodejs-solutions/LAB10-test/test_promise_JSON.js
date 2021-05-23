var assert = require('assert');
var loadJSON = require ('./promise_JSON');

describe ('JSON test', function() {
    it ('good JSON', function (done){
        loadJSON('good.json')
        .then(function (data) {
            assert.equal (data.name, "John");
            done();
        }).catch (done)
    });
   it ('bad JSON', function (done){
        loadJSON('bad.json')
        .catch (function (err) {
            if ((err instanceof Error) && (err.message == 'Bad JSON')) done ();
            else done (err);
        });
    });
    it ('nonexistent JSON', function (done){
        loadJSON('nonexist.json').catch (function (err) {
            if ((err instanceof Error) && (err.code == 'ENOENT')) done ();
            else done (err);
        });
    });
})