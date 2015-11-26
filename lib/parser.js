/**
 * Copyright 2015 Telefónica Investigación y Desarrollo Chile
 */

var logger = require('logops');
var utils = require('../lib/utils');
var formula = require("../lib/formula");

var wisesockParser = function (data, service) {
	var commands = new Array();
	var all_tokens = service.regex.exec(data);
	var entity_id = all_tokens[service.entity_id_index];
	var measures_token = all_tokens[service.measures_index];
	var measures = new Array();
	var measure;
	while (measure = service.measure_regex.exec(measures_token)) {
		measures.push(measure);
	}
	for (var i = 0; i < measures.length; i++) {
		var command = new Array();
		measure = measures[i];
		command[0] = entity_id;
		command[1] = service.entity_type;
		var attributes = new Array();
		if (service.bus != null) {
			command[0] = command[0] + "-" + measure[service.bus.entity_id_index];
			var keys = Object.keys(service.bus.attributes);
			for (var j = 0; j < keys.length; j++) {
				var attribute_value = measure[keys[j]];
				if (service.formula != null) {
					attribute_value = formula.applyFormula(service.formula, attribute_value);
				}
				var attribute = new Object();
				attribute.name = service.bus.attributes[keys[j]];
				attribute.type = service.attribute_type;
				attribute.value = attribute_value;
				attributes.push(attribute);
			}
		}
		else if (service.is_json) {
			var json_measure = JSON.parse(measures[0][0]);
			command[0] = command[0] + "-" + json_measure.modbus;
			for (var x = 0; x < json_measure.data.length; x++) {
				var key = Object.keys(json_measure.data[x])[0];
				var value = json_measure.data[x][key];
				var metadatas = [];
				var metadata = new Object();
				metadata.name = "measure_date";
				metadata.type = "date";
				metadata.value = json_measure.data[x]["measure_date"];
				// metadata.value = json_measure.measure_date; //fecha.replace(/(\/)/gm, "-") + " " + json_measure.hora;
				metadatas.push(metadata);
				var attribute = new Object();
				attribute.name = key;
				attribute.type = service.attribute_type;
				attribute.value = value;
				attribute.metadatas = metadatas;
				attributes.push(attribute);
			}
		}
		else {
			var keys = Object.keys(service.attributes);
			for (var j = 0; j < keys.length; j++) {
				var attribute_value = measure[keys[j]];
				var attribute = new Object();
				attribute.name = service.attributes[keys[j]];
				attribute.type = service.attribute_type;
				attribute.value = attribute_value;
				attributes.push(attribute);
			}
		}
		command[2] = attributes;
		logger.debug("command[0]: " + command[0]);
		logger.debug("command[1]: " + command[1]);
		logger.debug("command[2]: " + command[2]);
		commands.push(command);
	}
	return commands;
};

var parsers = {
	wisesockParser: wisesockParser
};

function parse(data, service) {
	return parsers[service.parser](data, service);
};

module.exports = {parse: parse};
