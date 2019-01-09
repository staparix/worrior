/** @jsx jsx */

import * as React from "react";
import { css, jsx } from "@emotion/core";

type ExportButtonProps = {
    onClick: () => void;
};

const buttonStyle = css`
  padding: 10px;
  width: 200px;
`;

export class ExportButton extends React.Component<ExportButtonProps> {
    public render() {
        return (
            <button css={buttonStyle} onClick={this.props.onClick}>Export</button>
        );
    }
}
