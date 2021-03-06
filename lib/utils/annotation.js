"use strict";

exports.__esModule = true;
exports.evalFormula = evalFormula;
exports.parseAnnotationOpacity = parseAnnotationOpacity;
exports.extractRecordAnnotations = extractRecordAnnotations;
exports.formatAnnotationLabel = formatAnnotationLabel;
exports.extractAnnotationLabels = extractAnnotationLabels;

var _core = require("@superset-ui/core");

var _mathjs = require("mathjs");

/* eslint-disable no-underscore-dangle */

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
function evalFormula(formula, data) {
  const {
    value
  } = formula;
  const node = (0, _mathjs.parse)(value);
  const func = node.compile();
  return data.map(row => {
    return [new Date(Number(row.__timestamp)), func.evaluate({
      x: row.__timestamp
    })];
  });
}

function parseAnnotationOpacity(opacity) {
  switch (opacity) {
    case _core.AnnotationOpacity.Low:
      return 0.2;

    case _core.AnnotationOpacity.Medium:
      return 0.5;

    case _core.AnnotationOpacity.High:
      return 0.8;

    default:
      return 1;
  }
}

const NATIVE_COLUMN_NAMES = {
  descriptionColumns: ['long_descr'],
  intervalEndColumn: 'end_dttm',
  timeColumn: 'start_dttm',
  titleColumn: 'short_descr'
};

function extractRecordAnnotations(annotationLayer, annotationData) {
  const {
    name
  } = annotationLayer;
  const result = annotationData[name];

  if ((0, _core.isRecordAnnotationResult)(result)) {
    const {
      records
    } = result;
    const {
      descriptionColumns = [],
      intervalEndColumn = '',
      timeColumn = '',
      titleColumn = ''
    } = (0, _core.isTableAnnotationLayer)(annotationLayer) ? annotationLayer : NATIVE_COLUMN_NAMES;
    return records.map(record => ({
      descriptions: descriptionColumns.map(column => record[column] || ''),
      intervalEnd: record[intervalEndColumn] || '',
      time: record[timeColumn] || '',
      title: record[titleColumn] || ''
    }));
  }

  throw new Error('Please rerun the query.');
}

function formatAnnotationLabel(name, title, descriptions = []) {
  const labels = [];
  const titleLabels = [];
  const filteredDescriptions = descriptions.filter(description => !!description);
  if (name) titleLabels.push(name);
  if (title) titleLabels.push(title);
  if (titleLabels.length > 0) labels.push(titleLabels.join(' - '));
  if (filteredDescriptions.length > 0) labels.push(filteredDescriptions.join('\n'));
  return labels.join('\n\n');
}

function extractAnnotationLabels(layers, data) {
  const formulaAnnotationLabels = layers.filter(anno => anno.annotationType === _core.AnnotationType.Formula && anno.show).map(anno => anno.name);
  const timeseriesAnnotationLabels = layers.filter(anno => anno.annotationType === _core.AnnotationType.Timeseries && anno.show).flatMap(anno => {
    const result = data[anno.name];
    return (0, _core.isTimeseriesAnnotationResult)(result) ? result.map(annoSeries => annoSeries.key) : [];
  });
  return formulaAnnotationLabels.concat(timeseriesAnnotationLabels);
}