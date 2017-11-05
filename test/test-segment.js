'use strict';

const expect = require('chai').expect,
        Segment = require('../lib/segment');

describe('Segment', () => {
    let segment;

    beforeEach(() => {
        segment = new Segment();
    });

    it('expect to have property fields, that is an empty object', () => {
        expect(segment).to.have.property('fields')
                .that.is.an('object').that.is.empty;
    });
    it('expect property fields sum of values to be 0', () => {
        expect(segment.fieldsLength).to.equal(0);
    });
});