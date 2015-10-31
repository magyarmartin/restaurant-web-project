var expect = require("chai").expect;

var index = require("../index");
var assert = require("assert");


describe('index.js', function () {

    beforeEach( function () {
        
    });

    describe('getOrders',function(){
        it('should return an array', function () {
            assert(Array.isArray(index.getOrders()));
        });
    });
    
    describe('getAdmins',function(){
        it('should return an array', function () {
            assert(Array.isArray(index.getAdmins()));
        });
        it('should return an array with at least one object', function () {
            assert.notEqual(index.getAdmins().length, 0);
        });
        it('should contain objects with username, email, zip, city, pwd, and address property', function () {
            assert.notEqual(index.getAdmins()[0].username, undefined);
            assert.notEqual(index.getAdmins()[0].pwd, undefined);
            assert.notEqual(index.getAdmins()[0].zip, undefined);
            assert.notEqual(index.getAdmins()[0].email, undefined);
            assert.notEqual(index.getAdmins()[0].address, undefined);
            assert.notEqual(index.getAdmins()[0].city, undefined);
        });
    });
    describe('getUsers',function(){
        it('should return an array', function () {
            assert(Array.isArray(index.getUsers()));
        });
    });

});