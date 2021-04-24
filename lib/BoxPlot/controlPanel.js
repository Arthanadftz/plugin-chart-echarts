"use strict";

exports.__esModule = true;
exports.default = void 0;

var _core = require("@superset-ui/core");

var _chartControls = require("@arthanasti/chart-controls");

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
var _default = {
  controlPanelSections: [{
    label: (0, _core.t)('Query'),
    expanded: true,
    controlSetRows: [['metrics'], ['adhoc_filters'], ['custom_filters'], ['groupby'], ['columns'], ['limit'], [{
      name: 'whiskerOptions',
      config: {
        type: 'SelectControl',
        freeForm: true,
        label: (0, _core.t)('Whisker/outlier options'),
        default: 'Tukey',
        description: (0, _core.t)('Determines how whiskers and outliers are calculated.'),
        choices: (0, _chartControls.formatSelectOptions)(['Tukey', 'Min/max (no outliers)', '2/98 percentiles', '9/91 percentiles'])
      }
    }]]
  }, {
    label: (0, _core.t)('Chart Options'),
    expanded: true,
    controlSetRows: [['color_scheme'], [{
      name: 'x_ticks_layout',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('X Tick Layout'),
        choices: (0, _chartControls.formatSelectOptions)(['auto', 'flat', '45°', '90°', 'staggered']),
        default: 'auto',
        clearable: false,
        renderTrigger: true,
        description: (0, _core.t)('The way the ticks are laid out on the X-axis')
      }
    }], [{
      name: 'number_format',
      config: {
        type: 'SelectControl',
        freeForm: true,
        label: (0, _core.t)('Number format'),
        renderTrigger: true,
        default: 'SMART_NUMBER',
        choices: _chartControls.D3_FORMAT_OPTIONS,
        description: `${(0, _core.t)('D3 format syntax: https://github.com/d3/d3-format')} ${(0, _core.t)('Only applies when "Label Type" is set to show values.')}`
      }
    }]]
  }],
  sectionOverrides: {
    druidTimeSeries: {
      controlSetRows: [['granularity', 'druid_time_origin'], ['time_range']]
    },
    sqlaTimeSeries: {
      controlSetRows: [['granularity_sqla', 'time_grain_sqla'], ['time_range']]
    }
  },
  controlOverrides: {
    groupby: {
      label: (0, _core.t)('Series'),
      description: (0, _core.t)('Categories to group by on the x-axis.')
    },
    columns: {
      label: (0, _core.t)('Distribute across'),
      multi: true,
      description: (0, _core.t)('Columns to calculate distribution across. Defaults to temporal column if left empty.')
    }
  }
};
exports.default = _default;