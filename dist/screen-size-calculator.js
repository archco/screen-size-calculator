(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ScreenSizeCalculator"] = factory();
	else
		root["ScreenSizeCalculator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/screen-size-calculator.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/screen-size-calculator.ts":
/*!***************************************!*\
  !*** ./src/screen-size-calculator.ts ***!
  \***************************************/
/*! exports provided: ScreenSizeCalculator, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenSizeCalculator", function() { return ScreenSizeCalculator; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var ScreenSizeCalculator = /** @class */ (function () {
    function ScreenSizeCalculator(options) {
        if (options === void 0) { options = {}; }
        this.options = __assign({}, this.getDefaultOptions(), options);
        this.screenSize = this.calculate();
    }
    ScreenSizeCalculator.prototype.getDefaultOptions = function () {
        return {
            aspectRatio: '16:9',
            unit: 'inch',
        };
    };
    ScreenSizeCalculator.prototype.calculate = function () {
        this.setProperties();
        var _a = this.options, width = _a.width, height = _a.height, diagonal = _a.diagonal;
        var size;
        if (diagonal) {
            size = this.getScreenSizeFromDiagonal(diagonal);
        }
        else if (width) {
            size = this.getScreenSizeFromWidth(width);
        }
        else {
            size = this.getScreenSizeFromHeight(height);
        }
        var w = size[0], h = size[1], d = size[2];
        return {
            width: w,
            height: h,
            diagonal: d,
            unit: this.options.unit,
        };
    };
    /**
     * Returns screen size data.
     *
     * @param {Unit} [unit] 'inch' or 'cm'
     * @param {number} [precision=2] precision of the float number.
     * @returns {ScreenSize}
     * @memberof ScreenSizeCalculator
     */
    ScreenSizeCalculator.prototype.getData = function (unit, precision) {
        var _this = this;
        if (precision === void 0) { precision = 2; }
        var _a = this.screenSize, width = _a.width, height = _a.height, diagonal = _a.diagonal;
        var _b = [width, height, diagonal].map(function (x) {
            if (unit && unit !== _this.screenSize.unit) {
                switch (unit) {
                    case 'cm':
                        x = Object(_util__WEBPACK_IMPORTED_MODULE_0__["inchToCm"])(x);
                        break;
                    case 'inch':
                        x = Object(_util__WEBPACK_IMPORTED_MODULE_0__["cmToInch"])(x);
                        break;
                }
            }
            return Object(_util__WEBPACK_IMPORTED_MODULE_0__["decimal"])(x, precision);
        }), w = _b[0], h = _b[1], d = _b[2];
        return {
            width: w,
            height: h,
            diagonal: d,
            unit: unit || this.screenSize.unit,
        };
    };
    ScreenSizeCalculator.prototype.setProperties = function () {
        // set aspect ratio.
        var _a = this.options.aspectRatio.split(':').map(function (x) { return parseFloat(x); }), w = _a[0], h = _a[1];
        this.ratio = [w, h, Object(_util__WEBPACK_IMPORTED_MODULE_0__["getDiagonal"])(w, h)];
        // validate options.
        var _b = this.options, width = _b.width, height = _b.height, diagonal = _b.diagonal;
        if (!width && !height && !diagonal) {
            throw ReferenceError('At least one of width, height or diagonal must exist.');
        }
    };
    ScreenSizeCalculator.prototype.getScreenSizeFromDiagonal = function (diagonal) {
        var _a = this.ratio, w = _a[0], h = _a[1], d = _a[2];
        var width = diagonal * w / d;
        var height = diagonal * h / d;
        return [width, height, diagonal];
    };
    ScreenSizeCalculator.prototype.getScreenSizeFromWidth = function (width) {
        var _a = this.ratio, w = _a[0], h = _a[1], d = _a[2];
        var height = width * h / w;
        var diagonal = width * d / w;
        return [width, height, diagonal];
    };
    ScreenSizeCalculator.prototype.getScreenSizeFromHeight = function (height) {
        var _a = this.ratio, w = _a[0], h = _a[1], d = _a[2];
        var width = height * w / h;
        var diagonal = height * d / h;
        return [width, height, diagonal];
    };
    return ScreenSizeCalculator;
}());

/* harmony default export */ __webpack_exports__["default"] = (ScreenSizeCalculator);


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: getDiagonal, decimal, cmToInch, inchToCm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDiagonal", function() { return getDiagonal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decimal", function() { return decimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cmToInch", function() { return cmToInch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inchToCm", function() { return inchToCm; });
function getDiagonal(width, height) {
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
function decimal(num, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
}
function cmToInch(num) {
    return num / 2.54;
}
function inchToCm(num) {
    return num * 2.54;
}


/***/ })

/******/ });
});
//# sourceMappingURL=screen-size-calculator.js.map