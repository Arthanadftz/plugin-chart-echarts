"use strict";

exports.__esModule = true;
exports.default = Echart;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@superset-ui/core");

var _echarts = require("echarts");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
const Styles = _core.styled.div`
  height: ${({
  height
}) => height};
  width: ${({
  width
}) => width};
`;

function Echart({
  width,
  height,
  echartOptions
}) {
  const divRef = (0, _react.useRef)(null);
  const chartRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    if (!divRef.current) return;

    if (!chartRef.current) {
      chartRef.current = (0, _echarts.init)(divRef.current);
    }

    chartRef.current.setOption(echartOptions, true);
  }, [echartOptions]);
  (0, _react.useEffect)(() => {
    if (chartRef.current) {
      chartRef.current.resize({
        width,
        height
      });
    }
  }, [width, height]);
  return /*#__PURE__*/_react.default.createElement(Styles, {
    ref: divRef,
    height: height,
    width: width
  });
}