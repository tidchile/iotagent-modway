/**
 * Copyright 2015 Telefónica Investigación y Desarrollo Chile
 */

var parser = require('../lib/parser');
var assert = require("assert")

var logger = require('logops');
var conf = require('../wisesock-config');
logger.setLevel("DEBUG");
logger.getContext = function () {
	return {
		op: 'parser-test'
	};
};

describe('parser', function () {
	var wbinfoOK = "JCP001WBINFO-JCP001110618107>2008/11/06 17:47:34 A04 31.221<>2008/11/06 17:58:18 A03 32.781<";
	describe('#parse.WBINFO(\'' + wbinfoOK + '\')', function () {
		var expected =
			[
				['JCP001-A04', 'temperature_sensor',
					[
						{"name": "temperature", "type": "float", "value": "31.221"}
					]
				],
				['JCP001-A03', 'temperature_sensor',
					[
						{name: 'temperature', "type": 'float', value: "32.781"}
					]
				]
			];
		var actual = parser.parse(wbinfoOK, conf.services.WBINFO);
		it('Should be equals', function () {
			assert.deepEqual(actual, expected);
		});
	});
	var wbmodbusOK = "FW0002WBMODBUS-FW0002051900440>2015/05/19 14:13:07 M01 0604551049763690497D0A0C10004509D0004509A00045087000456DA000456C4000456C1606000042AE0000430C000043281C0E400044BF9000452BD000454F400044488000445E0000446200000000540C000000000000000000000000000000000000000000000000<>2015/05/19 14:13:07 M02 0604551049763690497D0A0C10004509D0004509A00045087000456DA000456C4000456C1606000042AE0000430C000043281C0E400044BF9000452BD000454F400044488000445E0000446200000000540C000000000000000000000000000000000000000000000000<";
	describe('#parse.WBMODBUS(\'' + wbmodbusOK + '\')', function () {
		var expected =
			[
				['FW0002-M01', 'electric_meter',
					[
						{name: "KWH", "type": 'float', value: 100897.7},
						{name: "KVAH", "type": 'float', value: 103716.1},
						{name: "V1", "type": 'float', value: 219.3},
						{name: "V2", "type": 'float', value: 220.5},
						{name: "V3", "type": 'float', value: 218.6},
						{name: "V1-2", "type": 'float', value: 379.9},
						{name: "V2-3", "type": 'float', value: 378.6},
						{name: "V3-1", "type": 'float', value: 378},
						{name: "I1", "type": 'float', value: 8.7},
						{name: "I2", "type": 'float', value: 14},
						{name: "I3", "type": 'float', value: 16.8},
						{name: "P1", "type": 'float', value: 153},
						{name: "P2", "type": 'float', value: 274.5},
						{name: "P3", "type": 'float', value: 332.5},
						{name: "PF1", "type": 'float', value: 80.1},
						{name: "PF2", "type": 'float', value: 89},
						{name: "PF3", "type": 'float', value: 90.4}
					]
				],
				['FW0002-M02', 'electric_meter',
					[
						{name: "KWH", "type": 'float', value: 100897.7},
						{name: "KVAH", "type": 'float', value: 103716.1},
						{name: "V1", "type": 'float', value: 219.3},
						{name: "V2", "type": 'float', value: 220.5},
						{name: "V3", "type": 'float', value: 218.6},
						{name: "V1-2", "type": 'float', value: 379.9},
						{name: "V2-3", "type": 'float', value: 378.6},
						{name: "V3-1", "type": 'float', value: 378},
						{name: "I1", "type": 'float', value: 8.7},
						{name: "I2", "type": 'float', value: 14},
						{name: "I3", "type": 'float', value: 16.8},
						{name: "P1", "type": 'float', value: 153},
						{name: "P2", "type": 'float', value: 274.5},
						{name: "P3", "type": 'float', value: 332.5},
						{name: "PF1", "type": 'float', value: 80.1},
						{name: "PF2", "type": 'float', value: 89},
						{name: "PF3", "type": 'float', value: 90.4}
					]
				]
			];
		var actual = parser.parse(wbmodbusOK, conf.services.WBMODBUS);
		it('Should be equals', function () {
			assert.deepEqual(actual, expected);
		});
	});
	var modbtagvOK = 'FW0002MODBTAGV-FW0002071300052{"site":"TID","modbus":"DT108-01","imei":"863071013836108","imsi":"730024800640773","data":[{"V1-N":"221.3000", "measure_date":"2015-07-13 16:12:46"} ,{"V2-N":"221.7000", "measure_date":"2015-07-13 16:12:45"}, {"V3-N":"219.9000", "measure_date":"2015-07-13 16:12:45"}, {"I1":"12.6000", "measure_date":"2015-07-13 16:12:45"}, {"I2":"25.6000", "measure_date":"2015-07-13 16:12:45"}, {"I3":"38.8000", "measure_date":"2015-07-13 16:12:45"}, {"FP1":"0.9060", "measure_date":"2015-07-13 16:12:45"}, {"FP2":"0.8620", "measure_date":"2015-07-13 16:12:45"}, {"FP3":"0.8880", "measure_date":"2015-07-13 16:12:45"}, {"KWH":"1097650.8700", "measure_date":"2015-07-13 16:12:45"}, {"KVAH":"1116292.8700", "measure_date":"2015-07-13 16:12:45"}, {"Freq":"0.0000", "measure_date":"2015-07-13 16:12:45"}, {"V1-V2":"384.1999", "measure_date":"2015-07-13 16:12:45"}, {"V2-V3":"381.4999", "measure_date":"2015-07-13 16:12:45"}, {"V3-V1":"381.5999", "measure_date":"2015-07-13 16:12:45"}, {"KW1":"491.0000", "measure_date":"2015-07-13 16:12:45"}, {"KW2":"490.0000", "measure_date":"2015-07-13 16:12:45"}, {"KW3":"756.9998", "measure_date":"2015-07-13 16:12:45"}]}';
	describe('#parse.MODBTAGV(\'' + modbtagvOK + '\')', function () {

		var expected =
			[
				['FW0002-DT108-01', 'electric_meter',
					[
						{
							name: "V1-N",
							"type": 'float',
							value: "221.3000",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:46"}]
						},
						{
							name: "V2-N",
							"type": 'float',
							value: "221.7000",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "V3-N",
							"type": 'float',
							value: "219.9000",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "I1",
							"type": 'float',
							value: "12.6000",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "I2",
							"type": 'float',
							value: "25.6000",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "I3",
							"type": 'float',
							value: "38.8000",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "FP1",
							"type": 'float',
							value: "0.9060",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "FP2",
							"type": 'float',
							value: "0.8620",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "FP3",
							"type": 'float',
							value: "0.8880",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "KWH",
							"type": 'float',
							value: "1097650.8700",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "KVAH",
							"type": 'float',
							value: "1116292.8700",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "Freq",
							"type": 'float',
							value: "0.0000",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "V1-V2",
							"type": 'float',
							value: "384.1999",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "V2-V3",
							"type": 'float',
							value: "381.4999",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "V3-V1",
							"type": 'float',
							value: "381.5999",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "KW1",
							"type": 'float',
							value: "491.0000",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "KW2",
							"type": 'float',
							value: "490.0000",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						},
						{
							name: "KW3",
							"type": 'float',
							value: "756.9998",
							"metadatas": [{"name": "measure_date", "type": "date", "value": "2015-07-13 16:12:45"}]
						}
					]
				]
			];
		var actual = parser.parse(modbtagvOK, conf.services.MODBTAGV);
		console.log("Actual");
		console.log(actual);
		it('Should be equals', function () {
			assert.deepEqual(actual, expected);
		});
	});
});
