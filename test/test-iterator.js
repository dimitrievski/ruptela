'use strict';
const expect = require('chai').expect,
        Iterator = require('../lib/iterator');

describe('Iterator', () => {
    let buf, bufIt;

    beforeEach(() => {
        buf = Buffer.from([1, 2, 3]);
        bufIt = new Iterator(buf);
    });

    it('expect to handle valid buffers', () => {
        expect(() => bufIt).to.not.throw(Error);
    });
    it('expect to handle invalid buffers', () => {
        expect(() => new Iterator("buffer"))
                .to.throw(Error, "must be an instance of Buffer");
    });
    it('expect property buffer to equal buffer', () => {
        expect(bufIt.buffer).to.equal(buf);
    });
    it('expect property offset to equal 0', () => {
        expect(bufIt.offset).to.equal(0);
    });
    it('expect property end to equal buffer length', () => {
        expect(bufIt.end).to.equal(buf.length);
    });
    it('expect property offset to be incremented by N, for N bytes read', () => {
        let offset = 0, length = 1;
        //iterate buffer using the ECMAScript 2015 (ES6) for..of syntax.
        for (const b of buf) {
            //manually iterate buffer using the Iterator
            const a = offset === 0 ? bufIt.readNext(length)
                    : bufIt.readNext(length, false);
            //compare both results
            expect(a).to.equal(b);
            //check if offset is incremented
            expect(bufIt.offset).to.equal(offset += length);
        }
    });
});
