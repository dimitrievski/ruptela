'use strict';

/**
 * Module dependencies
 */
const Command_1_68 = require('./command_1_68'),
        Record = require('../record');

/**
 * This class sets payload for command 1
 */
class Command_1 extends Command_1_68 {

    /**
     * Set payload
     */
    constructor() {
        super();

        /**
         * Set payload fields record
         */
        this.fields.record = new Record();
    }
}

/**
 * Expose class
 */
module.exports = Command_1;