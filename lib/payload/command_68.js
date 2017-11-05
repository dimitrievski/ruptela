'use strict';

/**
 * Module dependencies
 */
const Command_1_68 = require('./command_1_68'),
        RecordExtended = require('../record_extended');

/**
 * This class sets payload for command 68
 */
class Command_68 extends Command_1_68 {

    /**
     * Set payload
     */
    constructor() {
        super();

        /**
         * Set payload fields record
         */
        this.fields.record = new RecordExtended();
    }
}

/**
 * Expose class
 */
module.exports = Command_68;