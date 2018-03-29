export function getDiagonal(width: number, height: number): number {
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
}

/**
 * Returns the value of a number rounded to the nearest precision number.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
 *
 * @param {number} num
 * @param {number} precision
 * @returns {number}
 */
export function decimal(num: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}

export function cmToInch(num: number): number {
  return num / 2.54;
}

export function inchToCm(num: number): number {
  return num * 2.54;
}
