import {
  cmToInch,
  decimal,
  getDiagonal,
  inchToCm,
} from './util';

/** width, height, diagonal */
export type AspectRatio = [number, number, number];
/** 'inch' or 'cm'. */
export type Unit = 'inch'|'cm';
/** width, height, diagonal */
type SizeValues = [number, number, number];

export interface Options {
  width?: number;
  height?: number;
  diagonal?: number;
  /** The aspect ratio. e.g. '16:9', '4:3', '2.39:1' */
  aspectRatio?: string;
  /** 'inch' or 'cm'. default is 'inch' */
  unit?: Unit;
}

export interface ScreenSize {
  width: number;
  height: number;
  diagonal: number;
  /** 'inch' or 'cm'. */
  unit: Unit;
}

export class ScreenSizeCalculator {
  options: Options;
  ratio: AspectRatio;
  screenSize: ScreenSize;

  constructor(options: Options = {}) {
    this.options = {...this.getDefaultOptions(), ...options};
    this.screenSize = this.calculate();
  }

  getDefaultOptions(): Options {
    return {
      aspectRatio: '16:9',
      unit: 'inch',
    };
  }

  calculate(): ScreenSize {
    this.setProperties();
    const {width, height, diagonal} = this.options;
    let size: SizeValues;
    if (diagonal) {
      size = this.getScreenSizeFromDiagonal(diagonal);
    } else if (width) {
      size = this.getScreenSizeFromWidth(width);
    } else {
      size = this.getScreenSizeFromHeight(height);
    }
    const [w, h, d] = size;
    return {
      width: w,
      height: h,
      diagonal: d,
      unit: this.options.unit,
    };
  }

  /**
   * Returns screen size data.
   *
   * @param {Unit} [unit] 'inch' or 'cm'
   * @param {number} [precision=2] precision of the float number.
   * @returns {ScreenSize}
   * @memberof ScreenSizeCalculator
   */
  getData(unit?: Unit, precision: number = 2): ScreenSize {
    const { width, height, diagonal } = this.screenSize;
    const [w, h, d] = [width, height, diagonal].map(x => {
      if (unit && unit !== this.screenSize.unit) {
        switch (unit) {
          case 'cm': x = inchToCm(x); break;
          case 'inch': x = cmToInch(x); break;
        }
      }
      return decimal(x, precision);
    });
    return {
      width: w,
      height: h,
      diagonal: d,
      unit: unit || this.screenSize.unit,
    };
  }

  protected setProperties(): void {
    // set aspect ratio.
    const [w, h] = this.options.aspectRatio.split(':').map(x => parseFloat(x));
    this.ratio = [w, h, getDiagonal(w, h)];
    // validate options.
    const {width, height, diagonal} = this.options;
    if (!width && !height && !diagonal) {
      throw ReferenceError('At least one of width, height or diagonal must exist.');
    }
  }

  protected getScreenSizeFromDiagonal(diagonal: number): SizeValues {
    const [w, h, d] = this.ratio;
    const width = diagonal * w / d;
    const height = diagonal * h / d;
    return [width, height, diagonal];
  }

  protected getScreenSizeFromWidth(width: number): SizeValues {
    const [w, h, d] = this.ratio;
    const height = width * h / w;
    const diagonal = width * d / w;
    return [width, height, diagonal];
  }

  protected getScreenSizeFromHeight(height: number): SizeValues {
    const [w, h, d] = this.ratio;
    const width = height * w / h;
    const diagonal = height * d / h;
    return [width, height, diagonal];
  }
}

export default ScreenSizeCalculator;
