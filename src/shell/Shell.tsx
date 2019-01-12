/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/core";
import { container, headerNav, mainContainer, openedShoppingCart, sideMenu, submitStyle } from "./shell-styles";
import { SideMenu } from "./SideMenu";
import { MainView } from "./MainView";
import { assetsManager, bootstrap, getMainScene } from "./mainView3D";
import { Header } from "../components/Header";
import {
    Category,
    County,
    Entity,
    fetchData,
    getAllCategories,
    getAllCenturies,
    getAllCountry,
    getById,
    getFilteredData
} from "../mockServer/assetLoader";
import { ExportButton } from "../components/ExportButton";
import { ShoppingCart } from "../shopingCart/ShoppingCart";
import { applyMateril } from "../materials";

export const loadedOnTheScene: { [key: string]: BABYLON.AbstractMesh } = {};

function loadAssetFromApi(item: Entity) {
    const {meta: { assetName }, id, material} = item;
    const meshTask = assetsManager.addMeshTask(assetName, "", "/assets/", assetName);
    meshTask.onSuccess = (task) => {
        const mesh = task.loadedMeshes[0];
        if (material === "metal") {
            applyMateril(mesh, getMainScene());
        }
        loadedOnTheScene[id] = task.loadedMeshes[0];
    };
    assetsManager.load();
}

function uniqueArray<T>(arr: T[]): T[] {
    return Array.from(new Set<T>(arr));
}

function replaceAsset(prevAsset: Entity, newAsset: Entity) {
    if (loadedOnTheScene[prevAsset.id]) {
        loadedOnTheScene[prevAsset.id].dispose();
    }
    loadAssetFromApi(newAsset);
}

type ShellState = {
    readonly data: Entity[];
    readonly shoppingCartOpened: boolean;
    readonly selectedItemsIds: string[];
    readonly categories: Category[];
    readonly centuries: number[];
    readonly countries: County[];
    readonly selectedCategory: Category | undefined,
    readonly selectedCentury: number | undefined,
    readonly selectedCountry: County | undefined,
};

export class Shell extends React.Component<{}, ShellState> {
    public state: ShellState = {
        shoppingCartOpened: false,
        data: [],
        selectedItemsIds: [],
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
                shoppingCartOpened: false,
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
                                loadAsset={this.loadAssetFromServer}
                                data={getFilteredData(
                                    this.state.data,
                                    this.state.selectedCentury!,
                                    this.state.selectedCountry!,
                                    this.state.selectedCategory!,)}
                            />
                        </div>
                    </div>
                    <div css={[submitStyle, this.state.shoppingCartOpened ? openedShoppingCart : null]}>
                        <ExportButton
                            label={
                                this.state.shoppingCartOpened ?
                                    "Close" : `Show selected ${this.state.selectedItemsIds.length}`
                            }
                            onClick={this.toggleShoppingCart}
                        />
                        <div style={{padding: 25}}>
                            <ShoppingCart
                                onItemRemove={this.onItemRemoveFromShoppingCart}
                                selectedItems={this.getSelectedEntities(this.state.selectedItemsIds)}
                            />
                        </div>
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
    };
    private onCountryChange = (item: any) => {
        this.setState({selectedCountry: item.target.value});
    };
    private toggleShoppingCart = () => {
        this.setState((prevState) => {
            return {
                shoppingCartOpened: !prevState.shoppingCartOpened,
            };
        });
    };
    private onItemRemoveFromShoppingCart = (itemToRemove: Entity) => {
        const mesh = loadedOnTheScene[itemToRemove.id];
        if (mesh) {
            mesh.dispose();
            delete loadedOnTheScene[itemToRemove.id];
            this.setState((prevState) => {
                const selectedItems = prevState.selectedItemsIds.filter(id => id !== itemToRemove.id);
                return {
                    selectedItemsIds: selectedItems,
                };
            });
        }
    };
    private getSelectedEntities = (selectedIds: string[]) => {
        return this.state.data.filter((item) => {
            return selectedIds.indexOf(item.id) !== -1;
        });
    };

    private loadAssetFromServer = (id: string) => {
        const {data, selectedItemsIds} = this.state;
        const itemData = getById(id, data);
        if (!itemData || selectedItemsIds.indexOf(id) !== -1) {
            return;
        }

        const toReplaceId = selectedItemsIds.find((itemID) => {
            const item = getById(itemID, data);
            return item ? item.category === itemData.category : false;
        });

        if (toReplaceId) {
            replaceAsset(getById(toReplaceId, data)!, itemData);
            this.setState({
                selectedItemsIds: uniqueArray([...selectedItemsIds.filter((iID) => toReplaceId !== iID), id])
            });
            return;
        }

        loadAssetFromApi(itemData);
        this.setState({
            selectedItemsIds: uniqueArray([...selectedItemsIds, id])
        });
    };

}
