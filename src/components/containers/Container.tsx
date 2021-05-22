/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";

const container = css`

  cursor: pointer;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    margin: 0 auto;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    z-index: 1;
`;

export class Container extends React.Component {
    public render() {
        return (
            <div className="warrior-container" css={container}>
                { this.props.children }
            </div>
        );
    }
}
