/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { Category } from "../../domain";
// @ts-ignore
import { getAssetManager } from "./bootstrap";

const item = css`
  cursor: pointer;
  padding: 10px 20px;
  font-size: 11px;
  text-transform: uppercase;
  text-align: left;
  &:active {
    color: #000;
    transform: scale(0.95);
    transition: all 0.1s;
  }
`;

type Props = {
    count: number;
    category: Category;
    onClick?: (item: Category) => void;
};

export class SideMenuItem extends React.Component<Props> {
    public render() {
        return (
            <li className="list-group-flush" css={item} onClick={this.onSideMenuSelected}>
                {`${this.props.category.displayName} (${this.props.count})`}
            </li>
        );
    }

    private onSideMenuSelected = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.category);
        }
    }
}
