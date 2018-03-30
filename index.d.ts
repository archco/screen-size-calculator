export as namespace ScreenSizeCalculator;

/** width, height, diagonal */
export type AspectRatio = [number, number, number];
/** 'inch' or 'cm'. */
export type Unit = 'inch'|'cm';

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

  constructor(options?: Options);
  getDefaultOptions(): Options;
  calculate(): ScreenSize;

  /**
   * Returns screen size data.
   *
   * @param {Unit} [unit] 'inch' or 'cm'
   * @param {number} [precision=2] precision of the float number.
   * @returns {ScreenSize}
   * @memberof ScreenSizeCalculator
   */
  getData(unit?: Unit, precision?: number): ScreenSize;
}

export default ScreenSizeCalculator;
