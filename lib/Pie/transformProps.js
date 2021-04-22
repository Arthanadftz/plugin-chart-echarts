"use strict";

exports.__esModule = true;
exports.formatPieLabel = formatPieLabel;
exports.default = transformProps;

var _core = require("@superset-ui/core");

var _series = require("../utils/series");

var _defaults = require("../defaults");

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
const percentFormatter = (0, _core.getNumberFormatter)(_core.NumberFormats.PERCENT_2_POINT);

function formatPieLabel({
  params,
  pieLabelType,
  numberFormatter
}) {
  const {
    name = '',
    value,
    percent
  } = params;
  const formattedValue = numberFormatter(value);
  const formattedPercent = percentFormatter(percent / 100);
  if (pieLabelType === 'key') return name;
  if (pieLabelType === 'value') return formattedValue;
  if (pieLabelType === 'percent') return formattedPercent;
  if (pieLabelType === 'key_value') return `${name}: ${formattedValue}`;
  if (pieLabelType === 'key_value_percent') return `${name}: ${formattedValue} (${formattedPercent})`;
  if (pieLabelType === 'key_percent') return `${name}: ${formattedPercent}`;
  return name;
}

function transformProps(chartProps) {
  const {
    width,
    height,
    formData,
    queryData
  } = chartProps;
  const data = queryData.data || [];
  const {
    colorScheme,
    donut = false,
    groupby,
    innerRadius = 30,
    labelsOutside = true,
    labelLine = false,
    metric,
    numberFormat,
    outerRadius = 80,
    pieLabelType = 'value',
    showLabels = true,
    showLegend = false
  } = formData;
  const {
    label: metricLabel
  } = (0, _core.convertMetric)(metric);
  const keys = data.map(datum => (0, _series.extractGroupbyLabel)({
    datum,
    groupby
  }));

  const colorFn = _core.CategoricalColorNamespace.getScale(colorScheme);

  const numberFormatter = (0, _core.getNumberFormatter)(numberFormat);
  const transformedData = data.map(datum => {
    const name = (0, _series.extractGroupbyLabel)({
      datum,
      groupby
    });
    return {
      value: datum[metricLabel],
      name,
      itemStyle: {
        color: colorFn(name)
      }
    };
  });

  const formatter = params => {
    return formatPieLabel({
      params,
      numberFormatter,
      pieLabelType
    });
  };

  const defaultLabel = {
    formatter,
    show: showLabels,
    color: '#000000'
  };
  const echartOptions = {
    grid: { ..._defaults.defaultGrid,
      top: 30,
      bottom: 30,
      left: 30,
      right: 30
    },
    tooltip: { ..._defaults.defaultTooltip,
      trigger: 'item',
      formatter: params => {
        return formatPieLabel({
          params: params,
          numberFormatter,
          pieLabelType: 'key_value_percent'
        });
      }
    },
    legend: showLegend ? {
      orient: 'horizontal',
      left: 10,
      data: keys
    } : undefined,
    series: [{
      type: 'pie',
      animation: false,
      radius: [`${donut ? innerRadius : 0}%`, `${outerRadius}%`],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      labelLine: labelsOutside && labelLine ? {
        show: true
      } : {
        show: false
      },
      label: labelsOutside ? { ...defaultLabel,
        position: 'outer',
        alignTo: 'none',
        bleedMargin: 5
      } : { ...defaultLabel,
        position: 'inner'
      },
      emphasis: {
        label: {
          show: true,
          fontWeight: 'bold'
        }
      },
      // @ts-ignore
      data: transformedData
    }]
  };
  return {
    width,
    height,
    echartOptions
  };
}