"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@superset-ui/core");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const {
  area,
  annotationLayers,
  contributionMode,
  forecastEnabled,
  forecastInterval,
  forecastPeriods,
  forecastSeasonalityDaily,
  forecastSeasonalityWeekly,
  forecastSeasonalityYearly,
  logAxis,
  markerEnabled,
  markerSize,
  minorSplitLine,
  opacity,
  rowLimit,
  seriesType,
  stack,
  truncateYAxis,
  yAxisBounds,
  zoomable
} = _types.DEFAULT_FORM_DATA;
const config = {
  controlPanelSections: [{
    label: (0, _core.t)('Query'),
    expanded: true,
    controlSetRows: [['metrics'], ['groupby'], [{
      name: 'contributionMode',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Contribution Mode'),
        default: contributionMode,
        choices: [[null, 'None'], [_types.EchartsTimeseriesContributionType.Row, 'Total'], [_types.EchartsTimeseriesContributionType.Column, 'Series']],
        description: (0, _core.t)('Calculate contribution per series or total')
      }
    }], ['adhoc_filters'], ['custom_filters'], ['limit', 'timeseries_limit_metric'], [{
      name: 'order_desc',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Sort Descending'),
        default: true,
        description: (0, _core.t)('Whether to sort descending or ascending')
      }
    }], ['row_limit', null]]
  }, {
    label: (0, _core.t)('Annotations and Layers'),
    expanded: false,
    controlSetRows: [[{
      name: 'annotation_layers',
      config: {
        type: 'AnnotationLayerControl',
        label: '',
        default: annotationLayers,
        description: 'Annotation Layers'
      }
    }]]
  }, {
    label: (0, _core.t)('Predictive Analytics'),
    expanded: false,
    controlSetRows: [[{
      name: 'forecastEnabled',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Enable forecast'),
        renderTrigger: false,
        default: forecastEnabled,
        description: (0, _core.t)('Enable forecasting')
      }
    }], [{
      name: 'forecastPeriods',
      config: {
        type: 'TextControl',
        label: (0, _core.t)('Forecast periods'),
        validators: [_core.legacyValidateInteger],
        default: forecastPeriods,
        description: (0, _core.t)('How many periods into the future do we want to predict')
      }
    }], [{
      name: 'forecastInterval',
      config: {
        type: 'TextControl',
        label: (0, _core.t)('Confidence interval'),
        validators: [_core.legacyValidateNumber],
        default: forecastInterval,
        description: (0, _core.t)('Width of the confidence interval. Should be between 0 and 1')
      }
    }, {
      name: 'forecastSeasonalityYearly',
      config: {
        type: 'SelectControl',
        freeForm: true,
        label: 'Yearly seasonality',
        choices: [[null, 'default'], [true, 'Yes'], [false, 'No']],
        default: forecastSeasonalityYearly,
        description: (0, _core.t)('Should yearly seasonality be applied. An integer value will specify Fourier order of seasonality.')
      }
    }], [{
      name: 'forecastSeasonalityWeekly',
      config: {
        type: 'SelectControl',
        freeForm: true,
        label: 'Weekly seasonality',
        choices: [[null, 'default'], [true, 'Yes'], [false, 'No']],
        default: forecastSeasonalityWeekly,
        description: (0, _core.t)('Should weekly seasonality be applied. An integer value will specify Fourier order of seasonality.')
      }
    }, {
      name: 'forecastSeasonalityDaily',
      config: {
        type: 'SelectControl',
        freeForm: true,
        label: 'Daily seasonality',
        choices: [[null, 'default'], [true, 'Yes'], [false, 'No']],
        default: forecastSeasonalityDaily,
        description: (0, _core.t)('Should daily seasonality be applied. An integer value will specify Fourier order of seasonality.')
      }
    }]]
  }, {
    label: (0, _core.t)('Chart Options'),
    expanded: true,
    controlSetRows: [['color_scheme', 'label_colors'], [{
      name: 'seriesType',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Series Style'),
        renderTrigger: true,
        default: seriesType,
        choices: [[_types.EchartsTimeseriesSeriesType.Line, 'Line'], [_types.EchartsTimeseriesSeriesType.Scatter, 'Scatter'], [_types.EchartsTimeseriesSeriesType.Smooth, 'Smooth Line'], [_types.EchartsTimeseriesSeriesType.Bar, 'Bar'], [_types.EchartsTimeseriesSeriesType.Start, 'Step - start'], [_types.EchartsTimeseriesSeriesType.Middle, 'Step - middle'], [_types.EchartsTimeseriesSeriesType.End, 'Step - end']],
        description: (0, _core.t)('Series chart type (line, bar etc)')
      }
    }], [{
      name: 'stack',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Stack Lines'),
        renderTrigger: true,
        default: stack,
        description: (0, _core.t)('Stack series on top of each other')
      }
    }], [{
      name: 'area',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Area Chart'),
        renderTrigger: true,
        default: area,
        description: (0, _core.t)('Draw area under curves. Only applicable for line types.')
      }
    }, {
      name: 'opacity',
      config: {
        type: 'SliderControl',
        label: (0, _core.t)('Opacity'),
        renderTrigger: true,
        min: 0,
        max: 1,
        step: 0.1,
        default: opacity,
        description: (0, _core.t)('Opacity of Area Chart. Also applies to confidence band.')
      }
    }], [{
      name: 'markerEnabled',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Marker'),
        renderTrigger: true,
        default: markerEnabled,
        description: (0, _core.t)('Draw a marker on data points. Only applicable for line types.')
      }
    }, {
      name: 'markerSize',
      config: {
        type: 'SliderControl',
        label: (0, _core.t)('Marker Size'),
        renderTrigger: true,
        min: 0,
        max: 100,
        default: markerSize,
        description: (0, _core.t)('Size of marker. Also applies to forecast observations.')
      }
    }], [{
      name: 'zoomable',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Data Zoom'),
        default: zoomable,
        renderTrigger: true,
        description: (0, _core.t)('Enable data zooming controls')
      }
    }], // eslint-disable-next-line react/jsx-key
    [/*#__PURE__*/_react.default.createElement("h1", {
      className: "section-header"
    }, (0, _core.t)('Y Axis'))], ['y_axis_format'], [{
      name: 'logAxis',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Logarithmic y-axis'),
        renderTrigger: true,
        default: logAxis,
        description: (0, _core.t)('Logarithmic y-axis')
      }
    }, {
      name: 'minorSplitLine',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Minor Split Line'),
        renderTrigger: true,
        default: minorSplitLine,
        description: (0, _core.t)('Draw split lines for minor y-axis ticks')
      }
    }], [{
      name: 'truncateYAxis',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Truncate Y Axis'),
        default: truncateYAxis,
        renderTrigger: true,
        description: (0, _core.t)('Truncate Y Axis. Can be overridden by specifying a min or max bound.')
      }
    }], [{
      name: 'y_axis_bounds',
      config: {
        type: 'BoundsControl',
        label: (0, _core.t)('Y Axis Bounds'),
        renderTrigger: true,
        default: yAxisBounds,
        description: (0, _core.t)('Bounds for the Y-axis. When left empty, the bounds are ' + 'dynamically defined based on the min/max of the data. Note that ' + "this feature will only expand the axis range. It won't " + "narrow the data's extent.")
      }
    }]]
  }],
  // Time series charts need to override the `druidTimeSeries` and `sqlaTimeSeries`
  // sections to add the time grain dropdown.
  sectionOverrides: {
    druidTimeSeries: {
      controlSetRows: [['granularity', 'druid_time_origin'], ['time_range']]
    },
    sqlaTimeSeries: {
      controlSetRows: [['granularity_sqla', 'time_grain_sqla'], ['time_range']]
    }
  },
  controlOverrides: {
    row_limit: {
      default: rowLimit
    }
  }
};
var _default = config;
exports.default = _default;