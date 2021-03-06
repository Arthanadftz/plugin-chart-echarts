"use strict";

exports.__esModule = true;
exports.rebaseTimeseriesDatum = rebaseTimeseriesDatum;
exports.formatProphetTooltipSeries = exports.extractProphetValuesFromTooltipParams = exports.extractForecastSeriesContext = void 0;

var _types = require("../types");

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
const seriesTypeRegex = new RegExp(`(.+)(${_types.ForecastSeriesEnum.ForecastLower}|${_types.ForecastSeriesEnum.ForecastTrend}|${_types.ForecastSeriesEnum.ForecastUpper})$`);

const extractForecastSeriesContext = seriesName => {
  const regexMatch = seriesTypeRegex.exec(seriesName);
  if (!regexMatch) return {
    name: seriesName,
    type: _types.ForecastSeriesEnum.Observation
  };
  return {
    name: regexMatch[1],
    type: regexMatch[2]
  };
};

exports.extractForecastSeriesContext = extractForecastSeriesContext;

const extractProphetValuesFromTooltipParams = params => {
  const values = {};
  params.forEach(param => {
    const {
      marker,
      seriesId,
      value
    } = param;
    const context = extractForecastSeriesContext(seriesId);
    const numericValue = value[1];

    if (numericValue) {
      if (!(context.name in values)) values[context.name] = {
        marker: marker || ''
      };
      const prophetValues = values[context.name];
      if (context.type === _types.ForecastSeriesEnum.Observation) prophetValues.observation = numericValue;
      if (context.type === _types.ForecastSeriesEnum.ForecastTrend) prophetValues.forecastTrend = numericValue;
      if (context.type === _types.ForecastSeriesEnum.ForecastLower) prophetValues.forecastLower = numericValue;
      if (context.type === _types.ForecastSeriesEnum.ForecastUpper) prophetValues.forecastUpper = numericValue;
    }
  });
  return values;
};

exports.extractProphetValuesFromTooltipParams = extractProphetValuesFromTooltipParams;

const formatProphetTooltipSeries = ({
  seriesName,
  observation,
  forecastTrend,
  forecastLower,
  forecastUpper,
  marker,
  formatter
}) => {
  let row = `${marker}${seriesName}: `;
  let isObservation = false;

  if (observation) {
    isObservation = true;
    row += `${formatter(observation)}`;
  }

  if (forecastTrend) {
    if (isObservation) row += ', ';
    row += `?? = ${formatter(forecastTrend)}`;
    if (forecastLower && forecastUpper) // the lower bound needs to be added to the upper bound
      row += ` (${formatter(forecastLower)}, ${formatter(forecastLower + forecastUpper)})`;
  }

  return `${row.trim()}`;
};

exports.formatProphetTooltipSeries = formatProphetTooltipSeries;

function rebaseTimeseriesDatum(data) {
  const keys = data.length > 0 ? Object.keys(data[0]) : []; // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return data.map(row => {
    const newRow = {
      __timestamp: ''
    };
    keys.forEach(key => {
      const forecastContext = extractForecastSeriesContext(key);
      const lowerKey = `${forecastContext.name}${_types.ForecastSeriesEnum.ForecastLower}`;
      let value = row[key];

      if (forecastContext.type === _types.ForecastSeriesEnum.ForecastUpper && keys.includes(lowerKey) && value !== null && row[lowerKey] !== null) {
        value -= row[lowerKey];
      }

      newRow[key] = value;
    }); // eslint-disable-next-line @typescript-eslint/no-unsafe-return

    return newRow;
  });
}