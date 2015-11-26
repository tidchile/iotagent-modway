# Wisesock FIWARE IoT Agent

Iot Agent "wisesock" is compatible with the device "wisebox".

Generally speaking, a wisebox acts as a hub. It is equipped with a RS485 interface through which it communicates with the electric meters under MODBUS protocol. It features a modem 2G/3G through which opens a TCP socket sending a text data frame (JSON) with meter data already translated to the agent.

## Index
* Requisites
* Configuration
* Usage
* Dockerized Usage

### Requisites
* See package.json

### Configuration
1. Configure iot agent lib in config.js following the instructions in https://github.com/telefonicaid/iotagent-node-lib.
2. Configure the agent in wisesock-config.

### Usage
* ```npm install``` to install.
* ```npm start``` to run the agent.
* ```npm test``` to run the tests.

### Dockerized Usage

#### In a terminal, run:
```
docker-compose build
```
#### then:
```
docker-compose up
```

### Emulating the Wisebox (to test)

#### In a terminal, run:
```
nc <ip_address>:2002
```
#### then paste:
```
'FW0002MODBTAGV-FW0002071300052{"site":"TID","modbus":"DT108-01","imei":"863071013836108","imsi":"730024800640773","data":[{"V1-N":"221.3000", "measure_date":"2015-07-13 16:12:46"} ,{"V2-N":"221.7000", "measure_date":"2015-07-13 16:12:45"}, {"V3-N":"219.9000", "measure_date":"2015-07-13 16:12:45"}, {"I1":"12.6000", "measure_date":"2015-07-13 16:12:45"}, {"I2":"25.6000", "measure_date":"2015-07-13 16:12:45"}, {"I3":"38.8000", "measure_date":"2015-07-13 16:12:45"}, {"FP1":"0.9060", "measure_date":"2015-07-13 16:12:45"}, {"FP2":"0.8620", "measure_date":"2015-07-13 16:12:45"}, {"FP3":"0.8880", "measure_date":"2015-07-13 16:12:45"}, {"KWH":"1097650.8700", "measure_date":"2015-07-13 16:12:45"}, {"KVAH":"1116292.8700", "measure_date":"2015-07-13 16:12:45"}, {"Freq":"0.0000", "measure_date":"2015-07-13 16:12:45"}, {"V1-V2":"384.1999", "measure_date":"2015-07-13 16:12:45"}, {"V2-V3":"381.4999", "measure_date":"2015-07-13 16:12:45"}, {"V3-V1":"381.5999", "measure_date":"2015-07-13 16:12:45"}, {"KW1":"491.0000", "measure_date":"2015-07-13 16:12:45"}, {"KW2":"490.0000", "measure_date":"2015-07-13 16:12:45"}, {"KW3":"756.9998", "measure_date":"2015-07-13 16:12:45"}]}'
```
#### you will see this output:
```
<WISE><RC>0</RC></WISE>
```
#### to check interaction with context broker:
See the logs in logs/wisesock.log.
