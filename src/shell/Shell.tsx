/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/core";
import { container, headerNav, mainContainer, openedShoppingCart, sideMenu, submitStyle } from "./shell-styles";
import { SideMenu } from "./SideMenu";
import { MainView } from "./MainView";
import { bootstrap } from "./main-engine";
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
// @ts-ignore
import { createMetal } from "../materials";

export const loadedOnTheScene: { [key: string]: BABYLON.AbstractMesh } = {};



function uniqueArray<T>(arr: T[]): T[] {
    return Array.from(new Set<T>(arr));
}


type ShellState = {
    readonly data: Entity[];
    readonly shoppingCartOpened: boolean;
    readonly selectedItemsIds: string[];
    readonly categories: Category[];
    readonly centuries: string[];
    readonly countries: County[];
    readonly selectedCategory: Category | undefined,
    readonly selectedCentury: string | undefined,
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
    private scene!: BABYLON.Scene;
    // @ts-ignore
    private engine!: BABYLON.Engine;
    private metal!: BABYLON.PBRMaterial;

    public componentDidMount(): void {
        bootstrap(document.getElementById("main-view")! as HTMLCanvasElement).then((app) => {
            this.scene = app.scene;
            this.engine = app.engine;
            this.metal = createMetal(this.scene);
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
        this.setState({selectedCentury: item.target.value});
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
            this.replaceAsset(getById(toReplaceId, data)!, itemData);
            this.setState({
                selectedItemsIds: uniqueArray([...selectedItemsIds.filter((iID) => toReplaceId !== iID), id])
            });
            return;
        }

        this.loadAssetFromApi(itemData);
        this.setState({
            selectedItemsIds: uniqueArray([...selectedItemsIds, id])
        });
    };

    private loadAssetFromApi = (item: Entity) => {
        const {meta: { assetName }, id, material } = item;
        const assetsManager = new BABYLON.AssetsManager(this.scene);
        const meshTask = assetsManager.addMeshTask(assetName, "", "/assets/", assetName);
        meshTask.onSuccess = (task) => {
            const mesh = task.loadedMeshes[0];
            if (material === "metal") {
                mesh.material = this.metal;
            }
            loadedOnTheScene[id] = task.loadedMeshes[0];
        };
        assetsManager.load();
    };

    private replaceAsset(prevAsset: Entity, newAsset: Entity) {
        if (loadedOnTheScene[prevAsset.id]) {
            loadedOnTheScene[prevAsset.id].dispose();
        }
        this.loadAssetFromApi(newAsset);
    }

}
