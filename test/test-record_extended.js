'use strict';

const expect = require('chai').expect,
        Record = require('../lib/record'),
        RecordExtended = require('../lib/record_extended');

describe('Extended Record', () => {
    let record, recordExtended;

    beforeEach(() => {
        record = new Record();
        recordExtended = new RecordExtended();
    });

    it('expect to be an instance of Record', () => {
        expect(recordExtended).to.be.an.instanceof(Record);
    });
    it('expect to have property fields, that is a non-empty object', () => {
        expect(recordExtended).to.have.property('fields')
                .that.is.an('object').that.is.not.empty;
    });
    it('expect property fields to have keys: header and body', () => {
        expect(recordExtended.fields).to.have.all.keys('header', 'body');
    });
    it('expect header and body to be non-empty objects', () => {
        expect(recordExtended.fields.header).to.be.an('object').that.is.not.empty;
        expect(recordExtended.fields.body).to.be.an('object').that.is.not.empty;
    });
    it('expect header to have 12 keys, +1 from parent', () => {
        expect(Object.keys(recordExtended.fields.header).length)
                .to.equal(Object.keys(record.fields.header).length + 1);
    });
    it('expect body to have 4 keys, same as parent', () => {
        expect(Object.keys(recordExtended.fields.body).length)
                .to.equal(Object.keys(record.fields.body).length);
    });
    it('expect body to be same as parent', () => {
        expect(recordExtended.fields.body).to.deep.equal(record.fields.body);
    });
    it('expect header event ID to be 2 bytes, +1 from parent', () => {
        expect(recordExtended.fields.header.event_id)
                .to.equal(record.fields.header.event_id + 1);
    });
    it('expect property fields sum of values to be 29 bytes, +2 from parent', () => {
        expect(recordExtended.fieldsLength).to.equal(record.fieldsLength + 2);
    });
    it('expect IO ID Length to be 2 bytes, +1 from parent', () => {
        expect(recordExtended.ioIdLength).to.equal(record.ioIdLength + 1);
    });
});