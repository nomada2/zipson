import { stringify, parse } from '../../src';
import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiRoughly from 'chai-roughly';
import { CompressOptions } from '../../src';
chai.use(chaiRoughly);

export function testPackUnpack(original: any, expectedCompressionOffset = 0, roughly = false, options?: CompressOptions) {
  const packed = stringify(original, options);
  const unpacked = parse(packed);
  const baseline = JSON.stringify(original);
  const expected = baseline !== undefined ? JSON.parse(baseline) : undefined;
  if(roughly) {
    (<any>expect(unpacked, 'unpacked integrity').to).roughly(0.001).deep.equal(expected);
  } else {
    expect(unpacked, 'unpacked integrity').to.deep.equal(expected);
  }
  if(original !== undefined) {
    expect(packed.length, 'compressed size').to.be.lte(baseline.length + expectedCompressionOffset);
  }
}
