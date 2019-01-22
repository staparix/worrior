import * as React from "react";
import { Entity } from "../mockServer/assetLoader";
import { ShoppingItem } from "./ShoppingItem";

type ShoppingCartProps = {
    selectedItems: Entity[];
    onItemRemove: (item: Entity) => void;
};

export class ShoppingCart extends React.Component<ShoppingCartProps> {
    public render() {
        return (
            <div>
                <div>
                    {
                        this.props.selectedItems.map((item) => {
                            return <ShoppingItem  onRemove={this.props.onItemRemove} item={item} key={item.id}/>;
                        })
                    }
                </div>
                <div>
                    <button>Order</button>
                </div>
            </div>
        );
    }
}
