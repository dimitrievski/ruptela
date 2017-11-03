'use strict';

/**
 * Module dependencies
 */
const Segment = require('./segment');

/**
 * Base consists of 4 fields (13 bytes) 
 */
class Base extends Segment {

    /**
     * Set base
     */
    constructor() {
        super();

        /**
         * Set base fields
         */
        this.fields = {
            //Indicates the size of all fields, except itself and CRC16.
            packet_length: 2,
            //IMEI is unique number for every device.
            imei: 8,
            //Command ID describes how payload data should be handled.
            command_id: 1,
            //CRC is calculated by omitting first and last 2 bytes from buffer,
            //and using CRC16 Kermit algorithm for calculation.
            crc: 2
        };
    }
}

/**
 * Expose class
 */
module.exports = Base;