'use strict';

/**
 * Module dependencies
 */
const Base = require('./base'),
        Commander = require('./commander'),
        Crc = require('./crc'),
        Iterator = require('./iterator');

/**
 * Process buffer
 * 
 * @param {Buffer} buffer
 * @returns {Object}
 */
function process(buffer) {
    //set buffer iterator
    const bufIt = new Iterator(buffer);
    const bufEnd = bufIt.end;
    //get base
    const base = new Base();
    if (base.fieldsLength > bufEnd) {
        throw new Error("Buffer size is too small");
    }
    //get base fields
    const fields = base.fields;
    //read CRC, last 2 bytes from buffer
    const crc = bufIt.buffer.readUIntBE(bufEnd - fields.crc, fields.crc);
    //slice first and last 2 bytes from buffer
    const tmpBuffer = bufIt.buffer.slice(fields.packet_length, -fields.crc);
    //compare CRC codes (read with calculated)
    if (crc !== Crc.calculate(tmpBuffer)) {
        throw new Error("CRC is not valid");
    }
    //init data
    const data = {};
    //read packet length
    data.packet_length = bufIt.readNext(fields.packet_length);
    if (data.packet_length !== (bufEnd - fields.packet_length - fields.crc)) {
        throw new Error("Packet Length is not valid");
    }
    //read IMEI
    data.imei = bufIt.readNext(fields.imei);
    //read command ID
    data.command_id = bufIt.readNext(fields.command_id);
    //execute command
    const commander = new Commander(data.command_id);
    commander.command.execute(bufIt);
    //assign command data to payload
    data.payload = commander.command.data;
    //assign CRC as last field
    data.crc = crc;
    //return data and acknowledgement
    return {data, ack: commander.command.ack};
}

/**
 * Process buffer
 * 
 * @param {Buffer} buffer
 * @returns {Object}
 */
function main(buffer) {
    try {
        //Process buffer and return object containing data and acknowledgement
        return process(buffer);
    } catch (error) {
        //Return Error object
        return {error: error};
    }
}

/**
 * Expose main function
 */
module.exports = main;