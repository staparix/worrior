/** @jsx jsx */

import * as React from "react";
import { css, jsx } from "@emotion/core";

const container = css`
`;

const mainView = css`
    width: 500px;
    height: 100%;
`;

export const MainView: React.FunctionComponent = () => {
    return (
        <div css={container}>
            <canvas css={mainView} id="main-view"/>
        </div>
    );
};
