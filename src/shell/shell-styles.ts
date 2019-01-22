import { css } from "@emotion/core";

export const mainContainer = css`
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    width: 700px;
    margin: 0 auto;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    z-index: 1;
`;
export const container = css`
  display: flex;
  height: 500px;
  margin-bottom: 10%;
`;

export const headerNav = css`
  padding: 10px;
  background-color: #1f2323;;
  text-align: right;
`;

export const openedShoppingCart = css`
   transform: translate(0, 5%);
`;

export const submitStyle = css`
  text-align: center;
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255, 0.8);
  transform: translate(0, 90%);
  transition: transform 0.3s;
`;

export const sideMenu = css`
  width:  100%;
  text-align: center;
  overflow-y: scroll;
  max-height: 500px;
`