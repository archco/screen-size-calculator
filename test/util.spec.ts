import * as Util from '../src/util';

describe('#getDiagonal', () => {
  it('works.', () => {
    // pythagoras numbers.
    expect(Util.getDiagonal(3, 4)).toEqual(5);
  });
});

describe('#inchToCm', () => {
  it('works.', () => {
    expect(Util.inchToCm(24)).toEqual(60.96);
  });
});

describe('#cmToInch', () => {
  it('works.', () => {
    expect(Util.cmToInch(61)).toBeCloseTo(24.0157, 4);
  });
});
