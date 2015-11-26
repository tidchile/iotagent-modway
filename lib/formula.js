/**
 * Copyright 2015 Telefónica Investigación y Desarrollo Chile
 */

var toFloatFormula = function (hexa) {
    hexa = "0x" + hexa;
    hexa = hexa.substring(0, 2) + hexa.substring(6, 10) + hexa.substring(2, 6);
    var buf1 = new Buffer(4);
    buf1.writeInt32BE(hexa, 0);
    return buf1.readFloatBE(0) / 10;
};

var toFloatBEFormula = function (hexa) {
    var buf2 = new Buffer(4);
    buf2.writeInt32BE(hexa, 0);
    return buf2.readFloatBE(0);
};

var formulas = {
    toFloat: toFloatFormula,
    toFloatBE: toFloatBEFormula
};

function applyFormula(name, value) {
    return formulas[name](value);
};

module.exports = {applyFormula: applyFormula};
