'use strict';

const expect = require('chai').expect,
        Segment = require('../lib/segment'),
        Command = require('../lib/command'),
        Commander = require('../lib/commander');

describe('Commander', () => {
    let commander_1, commander_68;

    beforeEach(() => {
        commander_1 = new Commander(1);
        commander_68 = new Commander(68);
    });

    it('expect to handle valid command IDs', () => {
        expect(() => commander_1).to.not.throw(Error);
        expect(() => commander_68).to.not.throw(Error);
    });
    it('expect to handle invalid command IDs', () => {
        expect(() => new Commander("command"))
                .to.throw(Error, "is not supported");
        expect(() => new Commander(9999))
                .to.throw(Error, "is not supported");
    });
    it('expect property command to be an instance of Command', () => {
        expect(commander_1.command).to.be.an.instanceof(Command);
        expect(commander_68.command).to.be.an.instanceof(Command);
    });
    it('expect command setter to handle invalid commands', () => {
        expect(() => commander_1.command = new Segment())
                .to.throw(Error, "must be an instance of Command");
        expect(() => commander_68.command = new Segment())
                .to.throw(Error, "must be an instance of Command");
    });
});