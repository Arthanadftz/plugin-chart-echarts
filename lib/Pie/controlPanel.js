"use strict";

exports.__esModule = true;
exports.default = void 0;

var _core = require("@superset-ui/core");

var _chartControls = require("@superset-ui/chart-controls");

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
const noopControl = {
  name: 'noop',
  config: {
    type: '',
    renderTrigger: true
  }
};
const config = {
  controlPanelSections: [{
    label: (0, _core.t)('Query'),
    expanded: true,
    controlSetRows: [['groupby'], ['metric'], ['adhoc_filters'], ['custom_filters'], ['row_limit', null]]
  }, {
    label: (0, _core.t)('Chart Options'),
    expanded: true,
    controlSetRows: [[{
      name: 'pie_label_type',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Label Type'),
        default: 'key',
        renderTrigger: true,
        choices: [['key', 'Category Name'], ['value', 'Value'], ['percent', 'Percentage'], ['key_value', 'Category and Value'], ['key_percent', 'Category and Percentage'], ['key_value_percent', 'Category, Value and Percentage']],
        description: (0, _core.t)('What should be shown on the label?')
      }
    }, {
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
    }], [{
      name: 'donut',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Donut'),
        default: false,
        renderTrigger: true,
        description: (0, _core.t)('Do you want a donut or a pie?')
      }
    }, {
      name: 'show_legend',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Legend'),
        renderTrigger: true,
        default: true,
        description: (0, _core.t)('Whether to display a legend for the chart')
      }
    }], [{
      name: 'show_labels',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Show Labels'),
        renderTrigger: true,
        default: true,
        description: (0, _core.t)('Whether to display the labels.')
      }
    }], [{
      name: 'labels_outside',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Put labels outside'),
        default: true,
        renderTrigger: true,
        description: (0, _core.t)('Put the labels outside of the pie?')
      }
    }, {
      name: 'label_line',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Label Line'),
        default: false,
        renderTrigger: true,
        description: (0, _core.t)('Draw line from Pie to label when labels outside?')
      }
    }], ['color_scheme', noopControl], [{
      name: 'outerRadius',
      config: {
        type: 'SliderControl',
        label: (0, _core.t)('Outer Radius'),
        renderTrigger: true,
        min: 10,
        max: 100,
        step: 1,
        default: 80,
        description: (0, _core.t)('Outer edge of Pie chart')
      }
    }], [{
      name: 'innerRadius',
      config: {
        type: 'SliderControl',
        label: (0, _core.t)('Inner Radius'),
        renderTrigger: true,
        min: 0,
        max: 100,
        step: 1,
        default: 30,
        description: (0, _core.t)('Inner radius of donut hole')
      }
    }]]
  }],
  controlOverrides: {
    series: {
      validators: [_core.validateNonEmpty],
      clearable: false
    },
    row_limit: {
      default: 100
    }
  }
};
var _default = config;
exports.default = _default;