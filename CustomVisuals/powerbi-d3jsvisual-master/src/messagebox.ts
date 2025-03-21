/*
 *
 * Copyright (c) 2018 Jan Pieter Posthuma / DataScenarios
 *
 * All rights reserved.
 *
 * MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.utils {

    // d3
    import Selection = d3.Selection;

    export module MessageBox {

        export enum MessageBoxType {
            None,
            Info,
            Warning,
            Error
        }

        export interface MessageBoxOptions {
            type: MessageBoxType;
            base: Selection<any>;
            text?: string;
            label1?: string;
            label2?: string;
            label3?: string;
            callback1?: () => void;
            callback2?: () => void;
            callback3?: () => void;
        }

        export class MessageBox {

            private static yesno: string = "<div id='yesbtn'>yes</div>&nbsp;<div id='nobtn'>no</div>";

            public static setMessageBox(options: MessageBoxOptions)  {
                options.base
                    .style("display", options.type === MessageBoxType.None ? "none" : "inline-block")
                    .classed("info", options.type === MessageBoxType.Info)
                    .classed("warning", options.type === MessageBoxType.Warning)
                    .classed("error", options.type === MessageBoxType.Error)
                    .text(options.text);
                if (options.label1) { // First option; e.g. Yes
                    options.base
                        .append('div')
                        .classed('inlineBtn', true)
                        .text(options.label1)
                        .on('click', options.callback1 ? options.callback1 : () => options.base.style("display", "none"));
                }
                if (options.label2) { // Second option; e.g. No
                    options.base
                        .append('div')
                        .classed('inlineBtn', true)
                        .text(options.label2)
                        .on('click', options.callback2 ? options.callback2 : () => options.base.style("display", "none"));
                }
                if (options.label3) { // Third option; e.g. Cancel
                    options.base
                        .append('div')
                        .classed('inlineBtn', true)
                        .text(options.label3)
                        .on('click', options.callback3 ? options.callback3 : () => options.base.style("display", "none"));
                }
            }
        }
    }
}