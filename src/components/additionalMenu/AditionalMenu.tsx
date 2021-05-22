/** @jsx jsx */
import * as React from "react";
import { jsx, css } from "@emotion/core";

export const open = css`
   transform: translate(0, 0);
   opacity: 1;
`;

export const menu = css`
  text-align: center;
  padding: 10px;
  position: absolute;
  overflow-y: scroll;
  scroll-behavior: smooth;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255, 1);
  transform: translate(0,100%);
  opacity: 0;
  transition: transform, opacity 0.3s;
`;

const header = css`
  padding: 10px;
  text-align: right;
`;

type AdditionalMenuProps = {
    open: boolean;
    onClose: () => void;
};

export class AdditionalMenu extends React.PureComponent<AdditionalMenuProps> {
    public render() {
        return (
            <div css={ [menu, this.props.open ? open : null] }>
                <div css={header}>
                    <button onClick={this.props.onClose} type="button" className="btn btn-link">Close</button>
                </div>
                { this.props.children }
            </div>
        );
    }
}
