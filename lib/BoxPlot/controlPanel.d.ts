declare const _default: {
    controlPanelSections: ({
        label: string;
        expanded: boolean;
        controlSetRows: (string[] | {
            name: string;
            config: {
                type: string;
                freeForm: boolean;
                label: string;
                default: string;
                description: string;
                choices: [import("./types").BoxPlotFormDataWhiskerOptions, string][];
            };
        }[])[];
    } | {
        label: string;
        expanded: boolean;
        controlSetRows: (string[] | {
            name: string;
            config: {
                type: string;
                label: string;
                choices: [import("./types").BoxPlotFormXTickLayout, string][];
                default: string;
                clearable: boolean;
                renderTrigger: boolean;
                description: string;
            };
        }[] | {
            name: string;
            config: {
                type: string;
                freeForm: boolean;
                label: string;
                renderTrigger: boolean;
                default: string;
                choices: string[][];
                description: string;
            };
        }[])[];
    })[];
    sectionOverrides: {
        druidTimeSeries: {
            controlSetRows: string[][];
        };
        sqlaTimeSeries: {
            controlSetRows: string[][];
        };
    };
    controlOverrides: {
        groupby: {
            label: string;
            description: string;
        };
        columns: {
            label: string;
            multi: boolean;
            description: string;
        };
    };
};
export default _default;
//# sourceMappingURL=controlPanel.d.ts.map