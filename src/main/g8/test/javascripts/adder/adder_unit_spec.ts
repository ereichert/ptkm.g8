import { should } from 'chai';
import 'mocha';
import Adder from "../../../app/assets/javascripts/adder/adder";

should();

describe('Adder', () => {

    it('should return a zeroed addend 1 when created.', () => {
        const adder = new Adder();

        adder.addend1().should.equal("0");
    });
});
