'use strict';

/**
 * Module dependencies
 */
const Command_1_68 = require('./command_1_68');

/**
 * This class handles payload for command 68
 */
class Command_68 extends Command_1_68 {

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
module.exports = Command_68;