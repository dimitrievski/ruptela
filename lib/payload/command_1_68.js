'use strict';

/**
 * Module dependencies
 */
const Segment = require('../segment');

/**
 * This class sets payload for command 1 and 68
 */
class Command_1_68 extends Segment {

    /**
     * Set payload
     */
    constructor() {
        super();

        /**
         * Set payload fields
         */
        this.fields = {
            //Flag can be 0 (no records left in flash) or 1.
            records_left: 1,
            //Describes how many records are in buffer.
            records_total: 1,
            //Init record
            record: {}
        };
    }
}

/**
 * Expose class
 */
module.exports = Command_1_68;