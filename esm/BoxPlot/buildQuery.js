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
import { buildQueryContext, convertMetric } from '@superset-ui/core';
const PERCENTILE_REGEX = /(\d+)\/(\d+) percentiles/;
export default function buildQuery(formData) {
  const {
    whiskerOptions,
    columns,
    groupby,
    metrics: formDataMetrics
  } = formData; // TODO: Refactor superset-ui-cre/query and remove QueryFormResidual types which are causing confusion
  // @ts-ignore

  const metrics = formDataMetrics.map(metric => convertMetric(metric).label);
  return buildQueryContext(formData, baseQueryObject => {
    let whiskerType;
    let percentiles;
    const percentileMatch = PERCENTILE_REGEX.exec(whiskerOptions);
    const distributionColumns = columns || [];
    if (whiskerOptions === 'Tukey') whiskerType = 'tukey';else if (whiskerOptions === 'Min/max (no outliers)') whiskerType = 'min/max';else if (percentileMatch) {
      whiskerType = 'percentile';
      percentiles = [parseInt(percentileMatch[1], 10), parseInt(percentileMatch[2], 10)];
    } else {
      throw new Error(`Unsupported whisker type: ${whiskerOptions}`);
    }
    return [{ ...baseQueryObject,
      is_timeseries: distributionColumns.length === 0,
      groupby: (groupby || []).concat(distributionColumns),
      post_processing: [{
        operation: 'boxplot',
        options: {
          whisker_type: whiskerType,
          percentiles,
          groupby,
          metrics
        }
      }]
    }];
  });
}