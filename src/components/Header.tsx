import * as React from "react";
import { Category } from "../mockServer/assetLoader";

type HeaderProps = {
    onCategoryChange: (event: any) => void;
    onCenturyChange: (event: any) => void;
    onCountrieChange: (event: any) => void;
    categories: Category[];
    centuries: string[];
    countries: string[];
    centuriesSelected: string | undefined;
    categorySelected: Category | undefined;
    countrySelected: string | undefined;
};

export class Header extends React.Component<HeaderProps> {
    public render() {
        return (
            <div>
                <select value={this.props.countrySelected} onChange={this.props.onCountrieChange} name="select_env">
                    {this.renderOptions(this.props.countries)}
                </select>
                <select value={this.props.categorySelected} onChange={this.props.onCategoryChange} name="select_env">
                    {this.renderOptions(this.props.categories)}
                </select>
                <select value={this.props.centuriesSelected} onChange={this.props.onCenturyChange} name="select_env">
                    {this.renderOptions(this.props.centuries)}
                </select>
            </div>
        );
    }

    private renderOptions = (items: any[]) => {
        return items.map((item, index) => {
            return <option value={item} key={index}>{item}</option>;
        });
    }
}
