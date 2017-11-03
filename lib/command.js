'use strict';

/**
 * Module dependencies
 */
const Segment = require('./segment');

/**
 * This class represents "interface" for commands
 */
class Command {

    /**
     * Set payload (must be an instance of Segment),
     * and check if 'execute' is a function
     * 
     * @param {Segment} payload
     */
    constructor(payload) {
        //check if payload is a segment
        if (!(payload instanceof Segment)) {
            throw new Error("Command Payload must be an instance of Segment");
        }
        //set payload
        this.payload = payload;
        //check if function execute is implemented
        if (typeof this.execute !== "function") {
            throw new Error("Command must implement function 'execute'");
        }
        //init data and acknowledgement 
        //each command needs to return these two back
        this.data = {};
        this.ack = null;
    }
}

/**
 * Expose class
 */
module.exports = Command;