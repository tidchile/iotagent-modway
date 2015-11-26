/**
 * Copyright 2015 Telefónica Investigación y Desarrollo Chile
 */

var assert = require("assert")
var formula = require('../lib/formula');

describe('formula.applyFormula(x)', function () {
    it('Should be 2225', function () {
        assert.equal(formula.applyFormula("toFloatBE", "0x450B1000"), 2225);
    }),
        it('Should be 2205', function () {
            assert.equal(formula.applyFormula("toFloatBE", "0x4509D000"), 2205);
        }),
        it('Should be 222.5', function () {
            assert.equal(formula.applyFormula("toFloat", "1000450B"), 222.5);
        }),
        it('Should be 220.5', function () {
            assert.equal(formula.applyFormula("toFloat", "D0004509"), 220.5);
        });
});
