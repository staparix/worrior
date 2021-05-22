/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/core";

export type Option = {
    id: number;
    displayName: string;
};
type SelectProps = {
    options: Option[];
    onSelect: (entity: Option["id"]) => void;
    value: number;
};

export const Select: React.FunctionComponent<SelectProps> = (props) => {
    return (
        <select value={props.value} onChange={ onChange }>
            <option value={-1}>None</option>
            { props.options.map((op) => {
                return <option value={ op.id } key={ op.id }>{ op.displayName }</option>;
            }) }
        </select>
    );

    function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
        props.onSelect(+e.target.value);
    }
};
