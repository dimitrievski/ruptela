'use strict';

const expect = require('chai').expect,
        Segment = require('../lib/segment'),
        Base = require('../lib/base');

describe('Base', () => {
    let base;

    beforeEach(() => {
        base = new Base();
    });

    it('expect to be an instance of Segment', () => {
        expect(base).to.be.an.instanceof(Segment);
    });
    it('expect to have property fields, that is a non-empty object', () => {
        expect(base).to.have.property('fields')
                .that.is.an('object').that.is.not.empty;
    });
    it('expect property fields to have 4 keys', () => {
        expect(Object.keys(base.fields).length).to.equal(4);
    });
    it('expect property fields sum of values to be 13 bytes', () => {
        expect(base.fieldsLength).to.equal(13);
    });
});