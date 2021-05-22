/** @jsx jsx */
import * as React from "react";
import { Entity } from "../../domain";
import { ShoppingItem } from "./ShoppingItem";
import { jsx, css } from "@emotion/core";

const mainCard = css`
`;
const actionSection = css``;

type ShoppingCartProps = {
    selectedItems: Entity[];
    onItemRemove: (item: Entity) => void;
    onOrder: () => void;
};

export class ShoppingCart extends React.Component<ShoppingCartProps> {
    public render() {
        return (
            <div>
                <div className="row" css={mainCard}>
                    {
                        this.props.selectedItems.map((item) => {
                            return (
                                <div className="col-sm-4" key={item.id}>
                                    <ShoppingItem  onRemove={this.props.onItemRemove} item={item} />
                                </div>
                            );
                        })
                    }
                </div>
                <div css={actionSection}>
                    <button className="btn btn-success" onClick={this.props.onOrder}>Order</button>
                </div>
            </div>
        );
    }
}
