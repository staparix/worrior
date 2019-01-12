/** @jsx jsx */

import * as React from "react";
import { css, jsx } from "@emotion/core";

type ExportButtonProps = {
    onClick: () => void;
    label: string;
};

const buttonStyle = css`
  padding: 10px;
  width: 200px;
`;

export class ExportButton extends React.Component<ExportButtonProps> {
    public render() {
        return (
            <button
                css={buttonStyle}
                onClick={this.props.onClick}
            >
                {this.props.label}
            </button>
        );
    }
}
