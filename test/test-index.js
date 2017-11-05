'use strict';
const expect = require('chai').expect,
        process = require('../lib/index');

describe('Index', () => {
    let packet_len, imei, cmd, rec_left, rec_total;

    beforeEach(() => {
        packet_len = "000b"; //11
        imei = "000070473afaedd9"; //123451234512345
        cmd = "01";
        rec_left = "00";
        rec_total = "01";
    });

    it("expect to process valid input", () => {
        const buffer = Buffer.from("0045000070473afaedd944000159fc5a40000000d3e542f6184a37820929465a0900000c00070100050005001d3a0c001e0ff0019300000192000000890000010041000004af004dc3", "hex");
        const response = process(buffer);

        expect(response).to.not.have.property('error');
        expect(response).to.have.property('data').that.is.an("object");
        expect(response.data.imei).to.equal(parseInt(imei, 16));
        expect(response.data.command_id).to.equal(68);
    });
    it('expect to handle invalid input', () => {
        const response = process("buffer");

        expect(response).to.not.have.property('data');
        expect(response).to.have.property('error').that.is.an.instanceof(Error);
        expect(response.error.message).to.have.string("must be an instance of Buffer");
    });
    it('expect to handle input with small size', () => {
        const response = process(Buffer.from(imei, "hex"));

        expect(response).to.not.have.property('data');
        expect(response).to.have.property('error').that.is.an.instanceof(Error);
        expect(response.error.message).to.equal("Buffer size is too small");
    });
    it('expect to handle input with invalid value sent for CRC', () => {
        const str = packet_len + imei + cmd + "0000";
        const buffer = Buffer.from(str, "hex");
        const response = process(buffer);

        expect(response).to.not.have.property('data');
        expect(response).to.have.property('error').that.is.an.instanceof(Error);
        expect(response.error.message).to.equal("CRC is not valid");
    });
    it('expect to handle input with invalid value sent for packet length', () => {
        const str = "000a" + imei + cmd + rec_left + rec_total + "dc5d";
        const buffer = Buffer.from(str, "hex");
        const response = process(buffer);

        expect(response).to.not.have.property('data');
        expect(response).to.have.property('error').that.is.an.instanceof(Error);
        expect(response.error.message).to.equal("Packet Length is not valid");
    });
    it("expect to handle 'Command_1_68' input with no value sent for payload", () => {
        const str = "000a" + imei + cmd + rec_left + "807b";
        const buffer = Buffer.from(str, "hex");
        const response = process(buffer);

        expect(response).to.not.have.property('data');
        expect(response).to.have.property('error').that.is.an.instanceof(Error);
        expect(response.error.message).to.equal("Payload size is too small");
    });
    it("expect to handle 'Command_1_68' input with invalid value sent for records left", () => {
        const str = packet_len + imei + cmd + "02" + rec_total + "efed";
        const buffer = Buffer.from(str, "hex");
        const response = process(buffer);

        expect(response).to.not.have.property('data');
        expect(response).to.have.property('error').that.is.an.instanceof(Error);
        expect(response.error.message).to.have.string("Records left flag is not valid");
    });
    it("expect to handle 'Command_1_68' input with no value sent for records", () => {
        const str = packet_len + imei + cmd + rec_left + "00" + "cdd4";
        const buffer = Buffer.from(str, "hex");
        const response = process(buffer);

        expect(response).to.not.have.property('data');
        expect(response).to.have.property('error').that.is.an.instanceof(Error);
        expect(response.error.message).to.have.string("Records are not found");
    });
    it("expect to handle 'Command_1_68' input with invalid value sent for records", () => {
        const str = packet_len + imei + cmd + rec_left + rec_total + "dc5d";
        const buffer = Buffer.from(str, "hex");
        const response = process(buffer);

        expect(response).to.not.have.property('data');
        expect(response).to.have.property('error').that.is.an.instanceof(Error);
        expect(response.error.message).to.have.string("Records size is too small");
    });
});