# Screen Size Calculator

The javascript library class for calculating screen size.

## Usage

``` js
import ScreenSizeCalculator from 'screen-size-calculator';

// I wish get the width and height size of the 55 inches screen.
const size = new ScreenSizeCalculator({ diagonal: 55, unit: 'inch' });
size.getData().width;  // 47.94
size.getData().height; // 26.96

// What's the value as centimeters?
size.getData('cm').width;  // 121.76
size.getData('cm').height; // 68.49
```

## License

The MIT License
