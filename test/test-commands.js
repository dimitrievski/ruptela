'use strict';

const expect = require('chai').expect,
        commands = require('../lib/commands');

describe('Commands', () => {
    it('expect to be an array', () => {
        expect(commands).to.be.an('array').that.includes(1);
    });
    it('expect to support 2 commands', () => {
        expect(commands).to.have.lengthOf(2);
    });
});