/*
 * Copyright 2014 Telefónica Investigación y Desarrollo, S.A.U
 *
 * This file is part of fiware-iotagent-lib
 *
 * fiware-iotagent-lib is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * fiware-iotagent-lib is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with fiware-iotagent-lib.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[contacto@tid.es]
 */

var config = {
    logLevel: 'DEBUG',
    contextBroker: {
        host: process.env['CBROKER_HOST'],
        port: process.env['CBROKER_PORT']
    },
    server: {
        port: process.env['SERVER_PORT']
    },
    deviceRegistry: {
        type: 'memory'
    },
    types: {
        'electric_meter': {
            url: '/',
            apikey: '',
            type: 'electric_meter',
            commands: [],
            lazy: [],
            active: [
                {name: 'KWH', type: 'float'},
                {name: 'KVAH', type: 'float'},
                {name: 'V1', type: 'float'},
                {name: 'V2', type: 'float'},
                {name: 'V3', type: 'float'},
                {name: 'V1-2', type: 'float'},
                {name: 'V2-3', type: 'float'},
                {name: 'V3-1', type: 'float'},
                {name: 'I1', type: 'float'},
                {name: 'I2', type: 'float'},
                {name: 'I3', type: 'float'},
                {name: 'P1', type: 'float'},
                {name: 'P2', type: 'float'},
                {name: 'P3', type: 'float'},
                {name: 'PF1', type: 'float'},
                {name: 'PF2', type: 'float'},
                {name: 'PF3', type: 'float'}
            ]
        }
    },
    service: 'minsm',
    subservice: '/',
    providerUrl: process.env['PROVIDER_URL'],
    deviceRegistrationDuration: 'P1M',
    defaultType: 'Thing'
};

module.exports = config;
