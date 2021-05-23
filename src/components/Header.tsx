/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { Option } from "../components/select/Select";
import { Picky }  from "react-picky";
type HeaderProps = {
    centuries: Option[];
    selectedCentury: Option[];
    onCenturyChange: (c: any) => void;
    usaChecked: boolean;
    ussaChecked: boolean;
    onUssaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onUsaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const headerStyle = css`
  display: flex;
  justify-content: space-around;
`;

const labelStyle = css`
  color: #fff;
`;

const checkBox = css`
    display: flex;
    align-items: center;
    margin: 0 10px;
`;

export class Header extends React.Component<HeaderProps> {
    public render() {
        return (
            <div css={ headerStyle }>
                <div style={{ width: 120 }}>
                    <Picky
                        numberDisplayed={2}
                        placeholder="Century"
                        valueKey="id"
                        labelKey="displayName"
                        dropdownHeight={200}
                        multiple={true}
                        options={this.props.centuries}
                        includeSelectAll={false}
                        value={this.props.selectedCentury}
                        onChange={this.props.onCenturyChange}
                    />
                </div>
                <div css={ checkBox }>
                    <span css={ labelStyle }>Eastern</span>
                    <input
                        checked={ this.props.usaChecked }
                        onChange={ this.props.onUsaChange }
                        id="1"
                        type="checkbox"
                    />
                </div>
                <div css={ checkBox }>
                    <span css={ labelStyle }>Western</span>
                    <input
                        checked={ this.props.ussaChecked }
                        onChange={ this.props.onUssaChange }
                        id="2"
                        type="checkbox"
                    />
                </div>
            </div>
        );
    }
}
