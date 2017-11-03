# GPS tracking protocol

Communication protocol between Ruptela's GPS tracking devices and TCP server in Node.js.
This protocol supports only command IDs 1 and 68 for now.

## Usage

```js
const server = require('net').createServer();
const process = require('ruptela');

server.on('connection', (conn) => {
    const addr = conn.remoteAddress + ':' + conn.remotePort;
    console.log('New connection from %s', addr);

    conn.on('data', (data) => {
        console.log('New data from connection %s: %j', addr, data);
        const res = process(data);
        if (!res.error) {
            //do something with res.data

            //return acknowledgement
            conn.write(res.ack);
        } else {
            //do something with res.error
        }
    });
    conn.once('close', () => {
        console.log('Connection from %s closed', addr);
    });
    conn.on('error', (error) => {
        console.log('Error from connection %s: %s', addr, error.message);
    });
});
//configure server to listen on PORT
server.listen(PORT, () => {
    console.log('Server started on port %s at %s', server.address().port, server.address().address);
});
```

## Response Object

This protocol processes the given input (buffer), and returns an object,
containing the extracted data from the buffer, along with an acknowledgement.
You should receive the response object in the following format:

```js
//{
//    data: {
//        packet_length: 69,
//        imei: 123451234512345,
//        command_id: 68,
//        payload: {
//            records_left: 0,
//            records_total: 1,
//            records: [{
//                timestamp: 1509710400,
//                timestamp_extension: 0,
//                record_extension: 0,
//                priority: 0,
//                longitude: -739949834,
//                latitude: 407517058,
//                altitude: 2345,
//                angle: 18010,
//                satellites: 9,
//                speed: 0,
//                hdop: 12,
//                event_id: 7,
//                io: {
//                    '5': 0,
//                    '29': 14860,
//                    '30': 4080,
//                    '65': 1199,
//                    '137': 0,
//                    '402': 0,
//                    '403': 0
//                }
//            }]
//        },
//        crc: 19907
//    },
//    ack: < Buffer 00 02 64 01 13 bc >
//}
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm i --save ruptela
```

See the [package source](https://github.com/dimitrievski/ruptela) for more details.
