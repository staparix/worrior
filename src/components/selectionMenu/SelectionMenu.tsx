import { Category, Entity } from "../../domain";
import * as React from "react";
import { findByCategory } from "../../utils/domainUtils";

type SelectionMenuProps = {
    category: Category["id"] | undefined;
    data: Entity[],
    onSelect: (item: Entity) => void;
};

export class SelectionMenu extends React.PureComponent<SelectionMenuProps> {
    public render() {
        return (
            <div className="container">
                <div className="row">
                    { findByCategory(this.props.category, this.props.data).map(this.renderItem) }
                </div>
            </div>
        );
    }

    private renderItem = (item: Entity) => {
        const onSelected = () => {
            this.props.onSelect(item);
        };
        return (
            <div  key={ item.id } className="col-sm-6">
                <div onClick={ onSelected } className="card" style={ { marginBottom: 5 } }>
                    <div className="card">
                        <img
                            src={item.imgUrl}
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body">
                            <p className="card-text">{ item.displayName }</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
