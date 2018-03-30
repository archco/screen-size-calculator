import ScreenSizeCalculator from '../src/screen-size-calculator';

describe('#ScreenSizeCalculator', () => {
  describe('#constructor', () => {
    it('can construct.', () => {
      const screenSize = new ScreenSizeCalculator({ width: 15 });
      expect(screenSize instanceof ScreenSizeCalculator).toBeTruthy();
    });

    it('occurs reference error if not give any value of width, height or diagonal.', () => {
      expect(() => {
        const screenSize = new ScreenSizeCalculator();
      }).toThrowError(ReferenceError);
    });
  });

  describe('#screenSize', () => {
    it('should works when given diagonal value.', () => {
      const ss = new ScreenSizeCalculator({ diagonal: 24 });
      const { width, height, diagonal } = ss.screenSize;
      expect(diagonal).toBeCloseTo(24, 1);
      expect(width).toBeCloseTo(20.9, 1);
      expect(height).toBeCloseTo(11.8, 1);
    });

    it('should works when given width value.', () => {
      const ss = new ScreenSizeCalculator({ width: 10 });
      const { width, height, diagonal } = ss.screenSize;
      expect(diagonal).toBeCloseTo(11.5, 1);
      expect(width).toBeCloseTo(10, 1);
      expect(height).toBeCloseTo(5.6, 1);
    });

    it('should works when given height value.', () => {
      const ss = new ScreenSizeCalculator({ height: 10 });
      const { width, height, diagonal } = ss.screenSize;
      expect(diagonal).toBeCloseTo(20.4, 1);
      expect(width).toBeCloseTo(17.8, 1);
      expect(height).toBeCloseTo(10, 1);
    });
  });

  describe('#getData', () => {
    it('inch to cm.', () => {
      const ss = new ScreenSizeCalculator({ diagonal: 24, unit: 'inch' });
      const { diagonal, unit } = ss.getData('cm');
      expect(unit).toEqual('cm');
      expect(diagonal).toEqual(60.96);
    });

    it('cm to inch', () => {
      const ss = new ScreenSizeCalculator({ width: 100, unit: 'cm' });
      const { width, unit } = ss.getData('inch');
      expect(unit).toEqual('inch');
      expect(width).toEqual(39.37);
    });

    it('almost same as screenSize if default arguments.', () => {
      const ss = new ScreenSizeCalculator({ diagonal: 24 });
      const { width } = ss.screenSize;
      expect(ss.getData().width).toBeCloseTo(width, 2);
    });
  });

  describe('options#aspectRatio', () => {
    it('4:3 test.', () => {
      const ss = new ScreenSizeCalculator({ diagonal: 19, aspectRatio: '4:3' });
      const { width, height, diagonal} = ss.getData('inch', 1);
      expect(diagonal).toEqual(19);
      expect(width).toEqual(15.2);
      expect(height).toEqual(11.4);
    });

    it('2.39:1 test.', () => {
      const ss = new ScreenSizeCalculator({ diagonal: 32, aspectRatio: '2.39:1' });
      const { width, height, diagonal} = ss.getData('inch', 1);
      expect(diagonal).toEqual(32);
      expect(width).toEqual(29.5);
      expect(height).toEqual(12.4);
    });
  });
});
