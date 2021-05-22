/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { Category } from "../../domain";
import { SideMenuItem } from "./SideMenuItem";
import { TotalItemsInCategory } from "../../shell/hooks/useShellState";

const sideMenu = css`
`;

type Props = {
    stats: TotalItemsInCategory;
    data: Category[];
    onMenuItemSelected: (item: Category) => void;
};

export const SideMenu: React.FunctionComponent<Props> = (props) => {
    return (
        <ul className="list-group" css={sideMenu}>
            {props.data.map((item) => {
                return (
                    <SideMenuItem
                        count={props.stats[item.id]}
                        category={item}
                        key={item.id}
                        onClick={props.onMenuItemSelected}
                    />
                );
            })}
        </ul>
    );
};
