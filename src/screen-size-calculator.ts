import {
  cmToInch,
  decimal,
  getDiagonal,
  inchToCm,
} from './util';

export type AspectRatio = [number, number, number]; // width, height, diagonal
export type Unit = 'inch'|'cm';

export interface Options {
  width?: number;
  height?: number;
  diagonal?: number;
  aspectRatio?: string;
  unit?: Unit;
}

export interface ScreenSize {
  width: number;
  height: number;
  diagonal: number;
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
    if (diagonal) {
      return this.getScreenSizeFromDiagonal(diagonal);
    } else if (width) {
      return this.getScreenSizeFromWidth(width);
    } else {
      return this.getScreenSizeFromHeight(height);
    }
  }

  setProperties(): void {
    // set aspect ratio.
    const [w, h] = this.options.aspectRatio.split(':').map(x => parseFloat(x));
    this.ratio = [w, h, getDiagonal(w, h)];
    // validate options.
    const {width, height, diagonal} = this.options;
    if (!width && !height && !diagonal) {
      throw ReferenceError('At least one of width, height or diagonal must exist.');
    }
  }

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

  protected getScreenSizeFromDiagonal(diagonal: number): ScreenSize {
    const [w, h, d] = this.ratio;
    const width = diagonal * w / d;
    const height = diagonal * h / d;
    return {
      width,
      height,
      diagonal,
      unit: this.options.unit,
    };
  }

  protected getScreenSizeFromWidth(width: number): ScreenSize {
    const [w, h, d] = this.ratio;
    const height = width * h / w;
    const diagonal = width * d / w;
    return {
      width,
      height,
      diagonal,
      unit: this.options.unit,
    };
  }

  protected getScreenSizeFromHeight(height: number): ScreenSize {
    const [w, h, d] = this.ratio;
    const width = height * w / h;
    const diagonal = height * d / h;
    return {
      width,
      height,
      diagonal,
      unit: this.options.unit,
    };
  }
}

export default ScreenSizeCalculator;
