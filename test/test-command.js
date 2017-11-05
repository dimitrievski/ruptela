'use strict';

const expect = require('chai').expect,
        Segment = require('../lib/segment'),
        Command = require('../lib/command'),
        Command_1 = require('../lib/command/command_1'),
        Command_68 = require('../lib/command/command_68'),
        Command_1_68 = require('../lib/command/command_1_68'),
        Payload_1_68 = require('../lib/payload/command_1_68');

describe('Command', () => {
    it('expect to handle invalid payload', () => {
        expect(() => new Command("payload"))
                .to.throw(Error, "must be an instance of Segment");
    });
    it("expect to handle unimplemented function 'execute'", () => {
        expect(() => new Command(new Segment()))
                .to.throw(Error, "must implement function 'execute'");
    });
});

describe('Command_1_68', () => {
    let command_1, command_68, command_1_68;

    beforeEach(() => {
        command_1 = new Command_1();
        command_68 = new Command_68();
        command_1_68 = new Command_1_68(new Payload_1_68());
    });

    it('expect to have property payload, that is an instance of Payload_1_68', () => {
        expect(command_1).to.have.property('payload')
                .that.is.an.instanceof(Payload_1_68);
        expect(command_68).to.have.property('payload')
                .that.is.an.instanceof(Payload_1_68);
        expect(command_1_68).to.have.property('payload')
                .that.is.an.instanceof(Payload_1_68);
    });
    it("expect to have function 'execute'", () => {
        expect(command_1).to.have.property('execute')
                .that.is.a('function');
        expect(command_68).to.have.property('execute')
                .that.is.a('function');
        expect(command_1_68).to.have.property('execute')
                .that.is.a('function');
    });
    it('expect to handle invalid payload', () => {
        expect(() => new Command_1_68("payload"))
                .to.throw(Error, "must be an instance of Payload_1_68");
    });
});
