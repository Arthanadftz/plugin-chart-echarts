"use strict";

exports.__esModule = true;
exports.EchartsPieChartPlugin = exports.EchartsTimeseriesChartPlugin = exports.EchartsBoxPlotChartPlugin = void 0;

var _BoxPlot = _interopRequireDefault(require("./BoxPlot"));

exports.EchartsBoxPlotChartPlugin = _BoxPlot.default;

var _Timeseries = _interopRequireDefault(require("./Timeseries"));

exports.EchartsTimeseriesChartPlugin = _Timeseries.default;

var _Pie = _interopRequireDefault(require("./Pie"));

exports.EchartsPieChartPlugin = _Pie.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }