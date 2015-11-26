/**
 * Copyright 2015 Telefónica Investigación y Desarrollo Chile
 */

var moment = require('moment');
var conf = require('../wisesock-config');
var logger = require('logops');


function extractAttributes(attributes, callback) {
	callback(null, '', attributes);
}

function handleError(message) {
	return function (error) {
		if (error) {
			logger.error(message);
		}
		else {
			logger.info(message);
		}
	};
};

function cleanCommand(data) {
	return data.toString().replace(/(\r\n|\n|\r)/gm, "");
};

function buildXMLResponse(rc, showDate) {
	var today = moment();
	logger.debug("today.hours: " + today.hours());
	today.utc();
	logger.debug("today.hours: " + today.hours());
	var r = "";
	r += "<WISE>";
	r += "<RC>";
	r += rc;
	r += "</RC>";
	if (showDate) {
		r += "<DT>";
		r += today.format(conf.clockFormat);
		r += "</DT>";
	}
	r += "</WISE>";
	return r;
};

function getServiceName(data) {
	var keys = Object.keys(conf.services);
	for (var i = 0; i < keys.length; i++) {
		if (conf.services[keys[i]].regex != null && conf.services[keys[i]].regex.test(data)) {
			return keys[i];
		}
	}
	return "OTHER";
};

module.exports = {
	extractAttributes: extractAttributes,
	cleanCommand: cleanCommand,
	handleError: handleError,
	buildXMLResponse: buildXMLResponse,
	getServiceName: getServiceName
};
