'use strict';

/**
 * Module dependencies
 */
const Command_1_68 = require('./command_1_68');

/**
 * This class handles payload for command 1
 */
class Command_1 extends Command_1_68 {

    /**
     * Set payload
     * 
     * @param {Segment} payload
     */
    constructor(payload) {
        super(payload);
    }
}

/**
 * Expose class
 */
module.exports = Command_1;