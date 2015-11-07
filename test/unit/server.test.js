var expect = require("chai").expect;
var server = require("../../server");

describe('server.js', function() {
    
    it('should be a JavaScript file', function() {
        expect(server).to.be.a('object');
    })
})