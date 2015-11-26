/**
 * Copyright 2015 Telefónica Investigación y Desarrollo Chile
 */

var conf = require('../wisesock-config');
var async = require('async');
var utils = require('./utils');
var parser = require('./parser');
var logger = require('logops');

var commandHandler = function (data, socket, iotAgentLib, service) {
	var commands = parser.parse(data, service); // Call to parse wiseaccess data
	for (var i = 0; i < commands.length; i++) {
		var command = commands[i];
		async.waterfall([
				async.apply(utils.extractAttributes, command[2]),
				async.apply(iotAgentLib.update, command[0], command[1])
			],
			function (err, result) {
				if (err) {
					logger.error('Error sending data to Context Broker...');
					logger.error("err:" + err.message);
					return;
				}
				logger.info("result:" + result.toString());
				logger.info('Device value updated to context broker.');
			}
		);
	}
	socket.write(utils.buildXMLResponse(conf.okResponse));
	logger.info('Command processed.');
};

var getClockHandler = function (data, socket, iotAgentLib, service) {
	var clock = utils.buildXMLResponse(conf.okResponse, true, conf.getClockFormat);
	logger.info('clock: ' + clock);
	socket.write(clock);
	logger.info('GETCLOCK sent.');
};

var notRecognizedCommandHandler = function (data, socket, iotAgentLib, service) {
	logger.error('Not recognized command, sending 0...');
	socket.write(utils.buildXMLResponse(conf.okResponse));
};

var notImplementedHandler = function (data, socket, iotAgentLib, service) {
	logger.error('Not implemented, sending 0...');
	socket.write(utils.buildXMLResponse(conf.okResponse));
};

var handlers = {
	getClockHandler: getClockHandler,
	notRecognizedCommandHandler: notRecognizedCommandHandler,
	notImplementedHandler: notImplementedHandler,
	commandHandler: commandHandler
};

function handle(data, socket, iotAgentLib) {
	var name = utils.getServiceName(data);
	var service = conf.services[name];
	handlers[service.handler](data, socket, iotAgentLib, service);
};

module.exports = {
	handle: handle
};
