'use strict';

/**
 * Module dependencies
 */
const Command_1_68 = require('./command_1_68'),
        Payload_68 = require('../payload/command_68');

/**
 * This class handles payload for command 68
 */
class Command_68 extends Command_1_68 {

    /**
     * Set payload for command 68
     */
    constructor() {
        super(new Payload_68());
    }
}

/**
 * Expose class
 */
module.exports = Command_68;