'use strict';

/**
 * Module dependencies
 */
const sumov = require('sumov');

/**
 * This class represents a segment in a buffer
 */
class Segment {

    /**
     * Init fields
     */
    constructor() {
        this.fields = {};
    }

    /**
     * Get fields length
     * Calculate the sum of all fields
     * 
     * @returns {int}
     */
    get fieldsLength() {
        return sumov(this.fields);
    }

}

/**
 * Expose class
 */
module.exports = Segment;