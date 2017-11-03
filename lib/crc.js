'use strict';

/**
 * Module dependencies
 */
const crc = require('crc');

/**
 * This class calculates CRC
 */
class Crc {

    /**
     * Calculate CRC by using CRC16 Kermit algorithm for calculation
     * 
     * @param {Buffer} buffer
     * @returns {int}
     */
    static calculate(buffer) {
        return crc.crc16kermit(buffer);
    }

}

/**
 * Expose class
 */
module.exports = Crc;