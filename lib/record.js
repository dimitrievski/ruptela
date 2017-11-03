'use strict';

/**
 * Module dependencies
 */
const Segment = require('./segment');

/**
 * Record consists of 2 parts: header (23 bytes) and body (4-103 bytes).
 * Maximum record size is 126 bytes.
 */
class Record extends Segment {

    /**
     * Set record
     */
    constructor() {
        super();

        /**
         * Set record fields
         */
        this.fields = {
            //23 bytes
            header: {
                //Unix timestamp in seconds
                timestamp: 4,
                //Timestamp extension separates records with same timestamp.
                //Parameter will increase starting with 0, or will always be 0.
                timestamp_extension: 1,
                //Priority can be 0 (low) or 1 (high).
                //It depends on configuration of event which triggered record.
                priority: 1,
                //Longitude is GPS element that reveals the position of an object.
                //Value is already multiplied by –1 if longitude is in west.
                //Value is multiplied by 10000000 for precision.
                longitude: 4,
                //Latitude is GPS element that reveals the position of an object.
                //Value is already multiplied by –1 if latitude is in south.
                //Value is multiplied by 10000000 for precision.
                latitude: 4,
                //Altitude is GPS element that reveals the position of an object.
                //Parameter is in meters above sea level.
                //Value is already multiplied by 10 for precision.
                altitude: 2,
                //Angle is GPS element that reveals the direction of an object.
                //Parameter is in degrees, where 0 is north, increasing clock-wise.
                //Value is already multiplied by 100 for precision.
                angle: 2,
                //Satellites is GPS element that reveals the number of
                //visible GPS or GLONASS satellites.
                satellites: 1,
                //Speed is GPS element that reveals the speed of an object.
                //Parameter is in km/h.
                speed: 2,
                //HDOP (Horizontal Dilute Of Precision) is GPS element.
                //Determines the relative accuracy of a horizontal position.
                //The smaller the number, the better the geometry.
                //Value is already multiplied by 10 for precision.
                hdop: 1,
                //Parameter indicates why the record was created.
                //Value is event ID number.
                event_id: 1
            },
            //4-103 bytes
            body: {
                //Parameter indicates number of IO records, with length of 1 byte.
                n1: 1,
                //Parameter indicates number of IO records, with length of 2 bytes.
                n2: 1,
                //Parameter indicates number of IO records, with length of 4 bytes.
                n4: 1,
                //Parameter indicates number of IO records, with length of 8 bytes.
                n8: 1
            }
        };
        //IO ID length - 1 byte
        this.ioIdLength = 1;
        //IO IDs with signed integers
        this.ioIdSignedIntegers = [6, 26, 32, 33, 49, 50, 51, 56, 57, 58, 59, 60, 61, 62, 63, 64, 75, 76, 78, 79, 80, 96, 97, 101, 144, 145, 146, 147, 148, 149, 184, 185, 186, 187, 212, 229, 230, 231, 232, 233, 234, 419, 509, 510, 511, 512, 513, 514, 520, 584, 585, 586, 587, 594, 600, 601, 602, 603, 604, 611, 612, 613];
    }
}

/**
 * Expose class
 */
module.exports = Record;