/// <reference types="echarts" />
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
import { DataRecord, DataRecordValue, NumberFormatter, TimeFormatter, TimeseriesDataRecord } from '@superset-ui/core';
export declare function extractTimeseriesSeries(data: TimeseriesDataRecord[]): echarts.EChartOption.Series[];
export declare function formatSeriesName(name: DataRecordValue | undefined, { numberFormatter, timeFormatter, }?: {
    numberFormatter?: NumberFormatter;
    timeFormatter?: TimeFormatter;
}): string;
export declare function extractGroupbyLabel({ datum, groupby, numberFormatter, timeFormatter, }: {
    datum?: DataRecord;
    groupby?: string[] | null;
    numberFormatter?: NumberFormatter;
    timeFormatter?: TimeFormatter;
}): string;
//# sourceMappingURL=series.d.ts.map