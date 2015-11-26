/**
 * Copyright 2015 Telefónica Investigación y Desarrollo Chile
 */

var assert = require("assert");
var utils = require('../lib/utils');

var logger = require('logops');
logger.setLevel("DEBUG");
logger.getContext = function () {
    return {
        op: 'utils-test'
    };
};

var wbinfoOK1 = "FW0001WBINFO-FW0001051200179>2015/05/12 16:24:58 W01  25   <>2015/05/12 16:24:59 W05      15.369<"
var wbmodbusOK = "FW0002WBMODBUS-FW0002051900440>2015/05/19 14:13:07 M01 0604551049763690497D0A0C10004509D0004509A00045087000456DA000456C4000456C1606000042AE0000430C000043281C0E400044BF9000452BD000454F400044488000445E0000446200000000540C000000000000000000000000000000000000000000000000<"
var wbinfoOK = "JCP001WBINFO-JCP001110618107 >2008/11/06 17:47:34 A04 31.221< >2008/11/06 17:58:18 A03 32.781<";

var getclockOK = "JCP001GETCLOCK";
var initsessOK = "JCP001INITSESS00060";
var wbcmdlogOK = "JCP001WBCMDLOG-JCP0011106114902008/11/06 17:57:21 PING";
var wbstatsOK = "JCP001WBSTATS-JCP001110600802 PUC003   PWR 2008/11/06 17:54:31 San Esteban XM=2 SM=0 XR=22 SR=0 SK=0 ST=1 SC=1389 HB=0 AL=0 SQ=11 VE=15.0 VB=12.4 PW=2 PR=5010 0D 00:45:10"

var wbinfoErr1 = "JCP001XXXXXX-JCP001110618107 >2008/11/06 17:47:34 A04 41.221< >2008/11/06 17:58:18 A03 16.781<";
var wbinfoErr2 = "JCP001WBINFO-JCP001110618107 >2008/11/06 17:47:34 41.221< >2008/11/06 17:58:18 A03 16.781<";

var valid = [wbinfoOK, getclockOK, initsessOK, wbcmdlogOK, wbstatsOK];
var not_valid = [wbinfoErr1];

describe('utils', function () {
    describe('#buildXMLResponse()', function () {
        var expected = "<WISE><RC>0</RC><DT>19990624 113330</DT></WISE>";
        var actual = utils.buildXMLResponse("0", true);
        it(actual + ' should have the same length than ' + expected, function () {
            assert.equal(actual.length, expected.length);
        });
    });
    describe('#buildXMLResponse()', function () {
        var expected = "<WISE><RC>0</RC></WISE>";
        var actual = utils.buildXMLResponse("0");
        it(actual + ' should be equals to ' + expected, function () {
            assert.equal(actual, expected);
        });
    });
    describe('#cleanCommand()', function () {
        var toClean = "JCP001WBINFO-JCP001110618107 >2008/11/06 17:47:34 A04 31.221< >2008/11/06 17:58:18 A03\r 32.781<\n";
        var expected = "JCP001WBINFO-JCP001110618107 >2008/11/06 17:47:34 A04 31.221< >2008/11/06 17:58:18 A03 32.781<";
        var actual = utils.cleanCommand(toClean);
        it('Should be ' + expected, function () {
            assert.equal(actual, expected);
        });
    });
    describe('utils.getServiceName(x)', function () {
        it('Should be WBMODBUS', function () {
            assert.equal(utils.getServiceName(wbmodbusOK), "WBMODBUS");
        }),
        it('Should be WBINFO', function () {
            assert.equal(utils.getServiceName(wbinfoOK), "WBINFO");
        }),
        it('Should be OTHER', function () {
            assert.equal(utils.getServiceName(wbinfoErr1), "OTHER");
        }),
        it('Should be WBINFO', function () { // TODO: Should be false.
            assert.equal(utils.getServiceName(wbinfoErr2), "WBINFO");
        }),
        it('Should be GETCLOCK', function () {
            assert.equal(utils.getServiceName(getclockOK), "GETCLOCK");
        }),
        it('Should be INITSESS', function () {
            assert.equal(utils.getServiceName(initsessOK), "INITSESS");
        }),
        it('Should be WBCMDLOG', function () {
            assert.equal(utils.getServiceName(wbcmdlogOK), "WBCMDLOG");
        }),
        it('Should be WBSTATS', function () {
            assert.equal(utils.getServiceName(wbstatsOK), "WBSTATS");
        }),
        it('Should be OTHER', function () {
            for (var i = 0; i < valid.length; i++) {
                assert.notEqual(utils.getServiceName(valid[i]), "OTHER");
            }
        }),
        it('Should be OTHER', function () {
            for (var i = 0; i < not_valid.length; i++) {
                assert.equal(utils.getServiceName(not_valid[i]), "OTHER");
            }
        })
    });
});
