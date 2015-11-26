/**
 * Copyright 2015 Telefónica Investigación y Desarrollo Chile
 */

var iotAgentLib = require('iotagent-node-lib');
var config = require('../config');

var net = require('net');
var wisesockConfig = require('../wisesock-config');
var utils = require('./utils');
var handler = require('./handler.js')

var logger = require('logops');

// logger initialization, needed just once.
logger.setLevel(wisesockConfig.logLevel);
logger.getContext = function () {
    return {
        op: 'iotagent-wisesock'
    };
};

function start() {
    iotAgentLib.activate(config, utils.handleError('FIWARE IOT agent started.'));
    var server = net.createServer(function (socket) {
        logger.info('Connected from remote address: ' + socket.remoteAddress + ', port: ' + socket.remotePort + '.');
        socket.on('data', function (data) {
            logger.info('Receiving data...');
            data = utils.cleanCommand(data);
            logger.info('data: ' + data);
            handler.handle(data, socket, iotAgentLib);
        });
        socket.on('end', utils.handleError('Client disconnected.'));
    });
    server.listen(wisesockConfig.southPort, utils.handleError('TCP socket listening on port: ' + wisesockConfig.southPort + '.'));
};

module.exports = {
    start: start
};
