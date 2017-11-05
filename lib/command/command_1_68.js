'use strict';

/**
 * Module dependencies
 */
const Command = require('../command'),
        Payload_1_68 = require('../payload/command_1_68');

/**
 * This class handles payload for command 1 and 68
 */
class Command_1_68 extends Command {

    /**
     * Set payload for command 1 and 68
     * 
     * @param {Payload_1_68} payload
     */
    constructor(payload) {
        //check if payload is truly a payload for command 1 and 68
        if (!(payload instanceof Payload_1_68)) {
            throw new Error("Command_1_68 payload must be an instance of Payload_1_68");
        }
        super(payload);
    }

    /**
     * Execute command
     * Process buffer in order to extract the command's payload
     * 
     * @param {Iterator} bufIt
     */
    execute(bufIt) {
        //get command payload fields
        const payloadFields = this.payload.fields;
        //get end of buffer
        const bufEnd = bufIt.end - 2;
        //check buffer size for next 2 fields (records_left and records_total)
        let tmpLen = payloadFields.records_left + payloadFields.records_total;
        if ((bufIt.offset + tmpLen) > bufEnd) {
            throw new Error("Payload size is too small");
        }
        //read records left flag
        this.data.records_left = bufIt.readNext(payloadFields.records_left);
        if (this.data.records_left !== 0 && this.data.records_left !== 1) {
            throw new Error("Payload: Records left flag is not valid");
        }
        //read total number of records
        this.data.records_total = bufIt.readNext(payloadFields.records_total);
        if (this.data.records_total < 1) {
            throw new Error("Payload: Records are not found");
        }
        //get record fields
        const record = payloadFields.record;
        const recordFields = record.fields;
        tmpLen = this.data.records_total * record.fieldsLength;
        //check buffer size for next N (records_total) records
        if ((bufIt.offset + tmpLen) > bufEnd) {
            throw new Error("Payload: Records size is too small");
        }
        //init records
        this.data.records = [];
        //iterate records
        while (bufIt.offset < bufEnd) {
            //init new record
            const rec = {};
            //iterate record header fields
            for (let f in recordFields.header) {
                if (f === 'longitude' || f === 'latitude' || f === 'altitude') {
                    //these fields have signed integers
                    rec[f] = bufIt.readNext(recordFields.header[f], false);
                } else {
                    //these fields have unsigned integers
                    rec[f] = bufIt.readNext(recordFields.header[f]);
                }
            }
            //init IO
            rec.io = {};
            //IO Value length - 1, 2, 4, 8 bytes
            let ioValueLength = 1;
            //iterate record body fields
            for (let f in recordFields.body) {
                //get the total number of IO records, with length of N bytes
                const n = bufIt.readNext(recordFields.body[f]);
                if (n > 0) {
                    //iterate through IO records
                    for (let i = 0; i < n; ++i) {
                        //get IO ID
                        const ioId = bufIt.readNext(record.ioIdLength);
                        //check if IO ID has unsigned integer value
                        const unsigned = !record.ioIdSignedIntegers.includes(ioId);
                        //set value for IO ID
                        rec.io[ioId] = bufIt.readNext(ioValueLength, unsigned);
                    }
                }
                //in each iteration, increment IO Value length (1, 2, 4, 8)
                ioValueLength += ioValueLength;
            }
            //push new record to records
            this.data.records.push(rec);
        }
        //set acknowledgement
        this.ack = Buffer.from("0002640113bc", "hex");
    }
}

/**
 * Expose class
 */
module.exports = Command_1_68;