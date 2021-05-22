/** @jsx jsx */

import * as React from "react";
import { css, jsx } from "@emotion/core";

const container = css`
  width: 70%;
  cursor: pointer;
`;

const main = css`
    width: 100%;
    height: 100%;
    outline: none;
`;

export const MainView: React.FunctionComponent = () => {
    return (
        <div css={container}>
            <canvas touch-action="none" css={main} id="main-view"/>
        </div>
    );
};
