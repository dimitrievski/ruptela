'use strict';

const expect = require('chai').expect,
        Segment = require('../lib/segment'),
        Record = require('../lib/record');

describe('Record', () => {
    let record;

    beforeEach(() => {
        record = new Record();
    });

    it('expect to be an instance of Segment', () => {
        expect(record).to.be.an.instanceof(Segment);
    });
    it('expect to have property fields, that is a non-empty object', () => {
        expect(record).to.have.property('fields')
                .that.is.an('object').that.is.not.empty;
    });
    it('expect property fields to have keys: header and body', () => {
        expect(record.fields).to.have.all.keys('header', 'body');
    });
    it('expect header and body to be non-empty objects', () => {
        expect(record.fields.header).to.be.an('object').that.is.not.empty;
        expect(record.fields.body).to.be.an('object').that.is.not.empty;
    });
    it('expect header to have 11 keys', () => {
        expect(Object.keys(record.fields.header).length).to.equal(11);
    });
    it('expect body to have 4 keys', () => {
        expect(Object.keys(record.fields.body).length).to.equal(4);
    });
    it('expect property fields sum of values to be 27 bytes', () => {
        expect(record.fieldsLength).to.equal(27);
    });
});