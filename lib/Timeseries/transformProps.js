"use strict";

exports.__esModule = true;
exports.default = transformProps;

var _core = require("@superset-ui/core");

var _types = require("./types");

var _types2 = require("../types");

var _controls = require("../utils/controls");

var _series = require("../utils/series");

var _annotation = require("../utils/annotation");

var _prophet = require("../utils/prophet");

var _defaults = require("../defaults");

var _transformers = require("./transformers");

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

/* eslint-disable camelcase */
function transformProps(chartProps) {
  const {
    width,
    height,
    formData,
    queryData
  } = chartProps;
  const {
    annotation_data: annotationData = {},
    data = []
  } = queryData;
  const {
    annotationLayers,
    colorScheme,
    contributionMode,
    logAxis,
    stack,
    minorSplitLine,
    truncateYAxis,
    yAxisFormat,
    yAxisBounds,
    zoomable
  } = { ..._types.DEFAULT_FORM_DATA,
    ...formData
  };

  const colorScale = _core.CategoricalColorNamespace.getScale(colorScheme);

  const rebasedData = (0, _prophet.rebaseTimeseriesDatum)(data);
  const rawSeries = (0, _series.extractTimeseriesSeries)(rebasedData);
  const series = [];
  const formatter = (0, _core.getNumberFormatter)(contributionMode ? ',.0%' : yAxisFormat);
  rawSeries.forEach(entry => {
    const transformedSeries = (0, _transformers.transformSeries)(entry, formData, colorScale);
    if (transformedSeries) series.push(transformedSeries);
  });
  annotationLayers.filter(layer => layer.show).forEach(layer => {
    if ((0, _core.isFormulaAnnotationLayer)(layer)) series.push((0, _transformers.transformFormulaAnnotation)(layer, data, colorScale));else if ((0, _core.isIntervalAnnotationLayer)(layer)) {
      series.push(...(0, _transformers.transformIntervalAnnotation)(layer, data, annotationData, colorScale));
    } else if ((0, _core.isEventAnnotationLayer)(layer)) {
      series.push(...(0, _transformers.transformEventAnnotation)(layer, data, annotationData, colorScale));
    } else if ((0, _core.isTimeseriesAnnotationLayer)(layer)) {
      series.push(...(0, _transformers.transformTimeseriesAnnotation)(layer, formData, data, annotationData));
    }
  }); // yAxisBounds need to be parsed to replace incompatible values with undefined

  let [min, max] = (yAxisBounds || []).map(_controls.parseYAxisBound); // default to 0-100% range when doing row-level contribution chart

  if (contributionMode === 'row' && stack) {
    if (min === undefined) min = 0;
    if (max === undefined) max = 1;
  }

  const echartOptions = {
    grid: { ..._defaults.defaultGrid,
      top: 30,
      bottom: zoomable ? 80 : 0,
      left: 20,
      right: 20
    },
    xAxis: {
      type: 'time'
    },
    yAxis: { ..._defaults.defaultYAxis,
      type: logAxis ? 'log' : 'value',
      min,
      max,
      minorTick: {
        show: true
      },
      minorSplitLine: {
        show: minorSplitLine
      },
      axisLabel: {
        formatter
      },
      scale: truncateYAxis
    },
    tooltip: { ..._defaults.defaultTooltip,
      trigger: 'axis',
      formatter: params => {
        // @ts-ignore
        const rows = [`${(0, _core.smartDateVerboseFormatter)(params[0].value[0])}`]; // @ts-ignore

        const prophetValues = (0, _prophet.extractProphetValuesFromTooltipParams)(params);
        Object.keys(prophetValues).forEach(key => {
          const value = prophetValues[key];
          rows.push((0, _prophet.formatProphetTooltipSeries)({ ...value,
            seriesName: key,
            formatter
          }));
        });
        return rows.join('<br />');
      }
    },
    legend: {
      data: rawSeries.filter(entry => (0, _prophet.extractForecastSeriesContext)(entry.name || '').type === _types2.ForecastSeriesEnum.Observation).map(entry => entry.name || '').concat((0, _annotation.extractAnnotationLabels)(annotationLayers, annotationData)),
      right: zoomable ? 80 : 'auto'
    },
    series,
    toolbox: {
      show: zoomable,
      feature: {
        dataZoom: {
          yAxisIndex: false,
          title: {
            zoom: 'zoom area',
            back: 'restore zoom'
          }
        }
      }
    },
    dataZoom: zoomable ? [{
      type: 'slider',
      start: 0,
      end: 100,
      bottom: 20
    }] : []
  };
  return {
    // @ts-ignore
    echartOptions,
    width,
    height
  };
}