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
import { AnnotationData, CategoricalColorScale, EventAnnotationLayer, FormulaAnnotationLayer, IntervalAnnotationLayer, TimeseriesAnnotationLayer, TimeseriesDataRecord } from '@superset-ui/core';
import { EchartsTimeseriesFormData } from './types';
export declare function transformSeries(series: echarts.EChartOption.Series, formData: EchartsTimeseriesFormData, colorScale: CategoricalColorScale): echarts.EChartOption.Series | undefined;
export declare function transformFormulaAnnotation(layer: FormulaAnnotationLayer, data: TimeseriesDataRecord[], colorScale: CategoricalColorScale): echarts.EChartOption.Series;
export declare function transformIntervalAnnotation(layer: IntervalAnnotationLayer, data: TimeseriesDataRecord[], annotationData: AnnotationData, colorScale: CategoricalColorScale): echarts.EChartOption.Series[];
export declare function transformEventAnnotation(layer: EventAnnotationLayer, data: TimeseriesDataRecord[], annotationData: AnnotationData, colorScale: CategoricalColorScale): echarts.EChartOption.Series[];
export declare function transformTimeseriesAnnotation(layer: TimeseriesAnnotationLayer, formData: EchartsTimeseriesFormData, data: TimeseriesDataRecord[], annotationData: AnnotationData): echarts.EChartOption.Series[];
//# sourceMappingURL=transformers.d.ts.map