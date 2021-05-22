import { css } from "@emotion/core";

export const container = css`
  display: flex;
  height: 90%;
`;

export const canvasView = css`
  height: 100%;
`;

export const headerNav = css`
  padding: 10px;
  background-color: #1f2323;;
  text-align: right;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-right: 30%;
  display: flex;
  justify-content: space-around;
`;

export const loading = css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 46px;
    color: #ffff;
    z-index: 2;
`;

export const sideMenu = css`
  width: 30%;
  text-align: center;
  overflow-y: scroll;
  max-height: 600px;
`
