/**
 * Copyright 2015 Telefónica Investigación y Desarrollo Chile
 */

var wisesockConfig = {
    southPort: 2002,
    okResponse: '0',
    logLevel: "DEBUG",
    clockFormat: "YYYYMMDD HHmmss",
    maxWbInfoGapInYears: 1,

    services: {
        GETCLOCK: {
            handler: "getClockHandler",
            regex: /^(\w{6})(GETCLOCK)(.*)$/
        },
        INITSESS: {
            handler: "notImplementedHandler",
            regex: /^(\w{6})(INITSESS)(\w{5})(.*)$/
        },
        WBCMDLOG: {
            handler: "notImplementedHandler",
            regex: /^(\w{6})(WBCMDLOG)-(.*)$/
        },
        WBSTATS: {
            handler: "notImplementedHandler",
            regex: /^(\w{6})(WBSTATS)-(.*)$/
        },
        WBINFO: {
            handler: "commandHandler",
            parser: "wisesockParser",
            regex: /^(\w{6})(WBINFO)-(\w{6})(.{9})(.*)$/,
            measure_regex: />(\S{10}) (\S{8}) (\S{3})\s+(\S+)</g,
            entity_type: 'temperature_sensor',
            attribute_type: 'float',
            entity_id_index: 3, // Token position in regex
            measures_index: 5,
            bus: {
                entity_id_index: 3,
                attributes: {
                    4: "temperature"
                }
            }
        },
        WBMODBUS: {
            handler: "commandHandler",
            parser: "wisesockParser",
            regex: /^(\w{6})(WBMODBUS)-(\w{6})(.{9})(.*)$/,
            measure_regex: />(\S{10}) (\S{8}) (\S{3}) \S{2}\S{2}(\S{8})(\S{8})\S{2}\S{2}(\S{8})(\S{8})(\S{8})(\S{8})(\S{8})(\S{8})\S{2}\S{2}(\S{8})(\S{8})(\S{8})\S{2}\S{2}(\S{8})(\S{8})(\S{8})(\S{8})(\S{8})(\S{8})(\S{8})\S{2}\S{2}(\S{8})(\S{8})(\S{8})(\S{8})(\S{8})(\S{8})</g,
            entity_type: 'electric_meter',
            attribute_type: 'float',
            entity_id_index: 3,
            measures_index: 5,
            formula: "toFloat",
            bus: {
                entity_id_index: 3,
                attributes: {
                    4: "KWH", // Energy (kilowatts/hour)
                    5: "KVAH", // Energy (kilovoltamperes/hour)
                    6: "V1", // Tension (volts)
                    7: "V2",
                    8: "V3",
                    9: "V1-2", // Tension between phases (volts)
                    10: "V2-3",
                    11: "V3-1",
                    12: "I1", // Electric current (amperes)
                    13: "I2",
                    14: "I3",
                    15: "P1", // Power (watts)
                    16: "P2",
                    17: "P3",
                    18: "PF1", // Power factor (percentage)
                    19: "PF2",
                    20: "PF3"
                },
            }
        },
        MODBTAGV: {
            handler: "commandHandler",
            parser: "wisesockParser",
            regex: /^(\w{6})(MODBTAGV)-(\w{6})(.{9})(.*)$/,  
            measure_regex: /^(.*)$/g,
            entity_type: 'electric_meter',  
            attribute_type: 'float',  
            entity_id_index: 3, 
            measures_index: 5, 
            is_json: true
        },
        OTHER: {
            handler: "notRecognizedCommandHandler"
        }
    }
};

module.exports = wisesockConfig;
