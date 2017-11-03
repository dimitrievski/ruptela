'use strict';

/**
 * Module dependencies
 */
const Record = require('./record');

/**
 * Extended record consists of 2 parts: header (25 bytes) and body (4-101 bytes).
 * Maximum record size is 126 bytes.
 */
class RecordExtended extends Record {

    /**
     * Set extended record
     */
    constructor() {
        super();

        let i = 1;
        const fields = {}, headerFields = this.fields.header;
        //Iterate over record header fields,
        //so that a new field can be added in between.
        for (let field in headerFields) {
            if (i === 3) {
                //Add new field at third position.
                //Separates records with same timestamp and timestamp extension.
                //Indicates if some data does not fit into one record.
                fields.record_extension = 1;
            }
            //Add the rest of the fields
            fields[field] = headerFields[field];
            ++i;
        }
        /**
         * Set extended record header fields
         */
        this.fields.header = fields;
        //Add an extra byte for event ID number.
        this.fields.header.event_id += 1;
        //Add an extra byte for IO ID length.
        this.ioIdLength += 1;
    }
}

/**
 * Expose class
 */
module.exports = RecordExtended;