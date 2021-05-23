var assert = require('assert');
var loadJSON = require('./sync_JSON');

describe ('JSON test', function() {
    it ('good JSON', function (){
        var data = loadJSON('good.json');
        assert.equal (data.name, "John");
    });
   it ('bad JSON', function (){
        assert.throws (function () {
            loadJSON('bad.json')
        }, function (err){
            return ((err instanceof Error) && (err.message == 'Bad JSON')) 
        })    
    });
    it ('nonexistent JSON', function (){
        assert.throws (function (){
            loadJSON('nonexist.json')
        }, function (err){
            return ((err instanceof Error) && (err.code == 'ENOENT')) 
        })   
    });
})