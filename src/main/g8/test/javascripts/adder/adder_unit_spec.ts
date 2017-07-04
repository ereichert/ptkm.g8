// import hello from './hello';
import { should } from 'chai';
import 'mocha';

should();

describe('something', () => {

    it('should fail', () => {
        const x = true;
        x.should.equal(false);
    });
});
