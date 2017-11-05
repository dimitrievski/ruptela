'use strict';

/**
 * Module dependencies
 */
const Command_1_68 = require('./command_1_68'),
        Payload_1 = require('../payload/command_1');

/**
 * This class handles payload for command 1
 */
class Command_1 extends Command_1_68 {

    /**
     * Set payload for command 1
     */
    constructor() {
        super(new Payload_1());
    }
}

/**
 * Expose class
 */
module.exports = Command_1;