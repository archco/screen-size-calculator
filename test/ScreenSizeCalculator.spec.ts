import ScreenSizeCalculator from '../src/screen-size-calculator';
import { decimal } from '../src/util';

describe('#ScreenSizeCalculator', () => {
  describe('#constructor', () => {
    it('can construct.', () => {
      const screenSize = new ScreenSizeCalculator({ width: 15 });
      expect(screenSize instanceof ScreenSizeCalculator).toBeTruthy();
    });

    it('occurs reference error if not give any value of width, height or diagonal.', () => {
      expect(() => {
        const screenSize = new ScreenSizeCalculator({});
      }).toThrowError(ReferenceError);
    });
  });

  describe('#screenSize', () => {
    it('should works when given diagonal value.', () => {
      const ss = new ScreenSizeCalculator({ diagonal: 24 });
      const { width, height, diagonal } = ss.screenSize;
      expect(decimal(width, 1)).toEqual(20.9);
      expect(decimal(height, 1)).toEqual(11.8);
      expect(decimal(diagonal, 1)).toEqual(24);
    });

    it('should works when given width value.', () => {
      const ss = new ScreenSizeCalculator({ width: 10 });
      const { width, height, diagonal } = ss.screenSize;
      expect(decimal(width, 1)).toEqual(10);
      expect(decimal(height, 1)).toEqual(5.6);
      expect(decimal(diagonal, 1)).toEqual(11.5);
    });

    it('should works when given height value.', () => {
      const ss = new ScreenSizeCalculator({ height: 10 });
      const { width, height, diagonal } = ss.screenSize;
      expect(decimal(width, 1)).toEqual(17.8);
      expect(decimal(height, 1)).toEqual(10);
      expect(decimal(diagonal, 1)).toEqual(20.4);
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
  });
});
