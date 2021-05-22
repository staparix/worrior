/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/core";
import { thumbler, thumblerInput, wrapper } from "./thumbler-styles";

type ThumblerProps = {
    readonly value1: string | number,
    readonly value2: string | number,
    readonly group: string;
    readonly selectedValue: string | number;
    readonly onChange: (e: any) => void;
};

type ThumblerState = {
    readonly selectedValue: string;
};

export class Thumbler extends React.PureComponent<ThumblerProps, ThumblerState> {
    public render() {
        const { value1, value2, selectedValue } = this.props;
        return (
            <div css={ thumbler }>
                <div css={ wrapper }>
                    <input
                        css={ thumblerInput }
                        onChange={ this.props.onChange }
                        checked={ value1 === selectedValue }
                        type="radio"
                        radioGroup={ this.props.group }
                    />
                    <label onClick={ this.onValue1Change }>{ value1 }</label>
                </div>
                <div css={ wrapper }>
                    <input
                        css={ thumblerInput }
                        onChange={ this.props.onChange }
                        checked={ value2 === selectedValue }
                        type="radio"
                        radioGroup={ this.props.group }
                    />
                    <label onClick={ this.onValue2Change }>{ value2 }</label>
                </div>
            </div>
        );
    }

    private onValue1Change = () => {
        this.props.onChange(this.props.value1);
    }
    private onValue2Change = () => {
        this.props.onChange(this.props.value2);
    }
}
