'use strict';

let command;

/**
 * Module dependencies
 */
const Command = require('./command'),
        commands = require('./commands');

/**
 * This class handles commands
 */
class Commander {

    /**
     * Set command
     * 
     * @param {int} command_id
     */
    constructor(command_id) {
        //check if command ID is supported
        if (!commands.includes(command_id)) {
            throw new Error("Command ID is not supported");
        }
        //require related command
        const CCommand = require('./command/command_' + command_id);
        //call setter
        this.command = new CCommand();
    }

    /**
     * Set command (must be an instance of Command)
     * 
     * @param {Command} cmd
     */
    set command(cmd) {
        //check if command is truly a command
        if (!(cmd instanceof Command)) {
            throw new Error("Commander Command must be an instance of Command");
        }
        command = cmd;
    }

    /**
     * Get command
     * 
     * @returns {Command}
     */
    get command() {
        return command;
    }

}

/**
 * Expose class
 */
module.exports = Commander;