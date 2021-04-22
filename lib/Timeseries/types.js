"use strict";

exports.__esModule = true;
exports.DEFAULT_FORM_DATA = exports.EchartsTimeseriesSeriesType = exports.EchartsTimeseriesContributionType = void 0;

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
let EchartsTimeseriesContributionType;
exports.EchartsTimeseriesContributionType = EchartsTimeseriesContributionType;

(function (EchartsTimeseriesContributionType) {
  EchartsTimeseriesContributionType["Row"] = "row";
  EchartsTimeseriesContributionType["Column"] = "column";
})(EchartsTimeseriesContributionType || (exports.EchartsTimeseriesContributionType = EchartsTimeseriesContributionType = {}));

let EchartsTimeseriesSeriesType;
exports.EchartsTimeseriesSeriesType = EchartsTimeseriesSeriesType;

(function (EchartsTimeseriesSeriesType) {
  EchartsTimeseriesSeriesType["Line"] = "line";
  EchartsTimeseriesSeriesType["Scatter"] = "scatter";
  EchartsTimeseriesSeriesType["Smooth"] = "smooth";
  EchartsTimeseriesSeriesType["Bar"] = "bar";
  EchartsTimeseriesSeriesType["Start"] = "start";
  EchartsTimeseriesSeriesType["Middle"] = "middle";
  EchartsTimeseriesSeriesType["End"] = "end";
})(EchartsTimeseriesSeriesType || (exports.EchartsTimeseriesSeriesType = EchartsTimeseriesSeriesType = {}));

const DEFAULT_FORM_DATA = {
  annotationLayers: [],
  area: false,
  forecastEnabled: false,
  forecastInterval: 0.8,
  forecastPeriods: 10,
  forecastSeasonalityDaily: null,
  forecastSeasonalityWeekly: null,
  forecastSeasonalityYearly: null,
  seriesType: EchartsTimeseriesSeriesType.Line,
  logAxis: false,
  opacity: 0.2,
  orderDesc: true,
  stack: false,
  markerEnabled: false,
  markerSize: 6,
  minorSplitLine: false,
  rowLimit: 10000,
  truncateYAxis: true,
  yAxisBounds: [null, null],
  zoomable: false
};
exports.DEFAULT_FORM_DATA = DEFAULT_FORM_DATA;