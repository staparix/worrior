/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/core";
import { container, headerNav, mainContainer, sideMenu, submitStyle } from "./shell-styles";
import { SideMenu } from "./SideMenu";
import { MainView } from "./MainView";
import { bootstrap } from "./mainView3D";
import { Header } from "../components/Header";
import {
    fetchData,
    getAllCategories,
    getAllCenturies,
    getAllCountry,
    getFilteredData
} from "../mockServer/assetLoader";
import { ExportButton } from "../components/ExportButton";

export class Shell extends React.Component {
    public state = {
        data: [],
        categories: [],
        centuries: [],
        countries: [],
        selectedCategory: undefined,
        selectedCentury: undefined,
        selectedCountry: undefined,
    };

    public componentDidMount(): void {
        bootstrap(document.getElementById("main-view")! as HTMLCanvasElement).then(() => {
            const data = fetchData();
            const categories = getAllCategories(data);
            const centuries = getAllCenturies(data);
            const countries = getAllCountry(data);
            this.setState({
                categories: categories,
                centuries: centuries,
                countries: countries,
                selectedCategory: categories[0],
                selectedCentury: centuries[0],
                selectedCountry: countries[0],
                data: data,
            });
        });
    }

    public render() {
        return (
            <div css={mainContainer}>
                <div css={headerNav}>
                    <Header
                        centuriesSelected={this.state.selectedCentury}
                        categorySelected={this.state.selectedCategory}
                        countrySelected={this.state.selectedCountry}
                        categories={this.state.categories}
                        centuries={this.state.centuries}
                        countries={this.state.countries}
                        onCategoryChange={this.onCategoryChange}
                        onCenturyChange={this.onCenturyChange}
                        onCountrieChange={this.onCountryChange}
                    />
                </div>
                <div>
                    <div css={container}>
                        <MainView/>
                        <div css={sideMenu}>
                            <SideMenu
                                onChange={this.onSelect}
                                data={getFilteredData(
                                    this.state.data,
                                    this.state.selectedCentury!,
                                    this.state.selectedCountry!,
                                    this.state.selectedCategory!,)}
                            />
                        </div>
                    </div>
                    <div css={submitStyle}>
                        <ExportButton onClick={this.exportOrder}/>
                    </div>
                </div>
            </div>
        );
    }

    private onCategoryChange = (item: any) => {
        this.setState({selectedCategory: item.target.value});
    }
    private onCenturyChange = (item: any) => {
        this.setState({selectedCentury: Number(item.target.value)});
    }
    private onCountryChange = (item: any) => {
        this.setState({selectedCountry: item.target.value});
    }
    private exportOrder = () => {
        alert(JSON.stringify({
            category: this.state.selectedCategory,
            century: this.state.selectedCentury,
            country: this.state.selectedCountry,
        }));
    };
    private onSelect = (selectedIds: string[]) => {
        console.log(selectedIds);
    }
}
