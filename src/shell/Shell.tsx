/** @jsx jsx */
import * as React  from "react";
import { jsx } from "@emotion/core";
import * as st from "./shell-styles";
import { SideMenu } from "../components/sideMenu/SideMenu";
import { MainView } from "./Main";
import { bootstrap } from "./bootstrap";
import { Header } from "../components/Header";
import {
    Category,
    Entity,
    getModelId,
} from "../domain";
import { ShoppingCart } from "../components/shopingCart/ShoppingCart";
import { Container } from "../components/containers/Container";
import { AdditionalMenu } from "../components/additionalMenu/AditionalMenu";
import { Footer } from "../components/footer/Footer";
import { SelectionMenu } from "../components/selectionMenu/SelectionMenu";
import { toOptions } from "../utils/domainUtils";
import { Sections, useShellState } from "../shell/hooks/useShellState";
import * as BABYLON from "@babylonjs/core";

type Models = { [key: string]: BABYLON.AbstractMesh; };
let models: Models = {};
const loadedModels: Models = {};

export function Shell() {
    const shellState = useShellState();
    let scene!: BABYLON.Scene;
    // @ts-ignore
    let engine!: Engine;

    React.useEffect(() => {
        bootstrap(document.getElementById("main-view")! as HTMLCanvasElement).then((app) => {
            scene = app.scene;
            engine = app.engine;
            loadScreen(scene);
            shellState.services.initData({
                shoppingCartOpened: false,
                categories: app.categories,
                centuries: app.centuries,
                selectedCategory: app.categories[0].id,
                data: app.models,
                normalizedEntities: app.normalizedEntities,
            });
        });
    }, [false]);
    const {
        loading,
        ussaChecked,
        usaChecked,
        categories,
        openedSection,
        centuries,
        selectedCentury,
    } = shellState.model;
    const centurieOptions = toOptions(centuries);
    const renderSection = (section: Sections) => {
        const { selectedCategory, selectedItemsIds } = shellState.model;
        switch (section) {
            case Sections.Category:
                return (
                    <SelectionMenu
                        data={ shellState.services.getData() }
                        onSelect={ onSelectedItem }
                        category={ selectedCategory }
                    />
                );
            case Sections.Ordering:
                return (
                    <div style={ { padding: 25, height: "100%", overflow: "scroll" } }>
                        <ShoppingCart
                            onOrder={ orderRequest }
                            onItemRemove={ onItemRemoveFromShoppingCart }
                            selectedItems={ getSelectedEntities(selectedItemsIds) }
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    const onUssaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        shellState.services.setUssaCheckbox(e.target.checked);
    };
    // @ts-ignore
    const onUsaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        shellState.services.setUsaCheckbox(e.target.checked);
    };

    const openOrderSection = () => {
        openSection(Sections.Ordering);
    };

    const onSectionClose = () => {
        openSection(Sections.Main);
    };

    const openSection = (section: Sections) => {
        shellState.services.openSection(section);
    };

    const onItemRemoveFromShoppingCart = (itemToRemove: Entity) => {
        hideModel(getModel(itemToRemove));
        shellState.services.removeItemFromSelected(itemToRemove);
    };
    const getSelectedEntities = (selectedIds: Entity["id"][]) => {
        return shellState.model.data.filter((item) => {
            return selectedIds.indexOf(item.id) !== -1;
        });
    };

    const onCategorySelect = (category: Category) => {
        openSection(Sections.Category);
        shellState.services.setSelectedCategory(category.id);
    };

    const showModel = (mesh: BABYLON.AbstractMesh) => {
        if (!loadedModels[mesh.name]) {
            shellState.services.setLoading(true);
        }
        mesh.visibility = 1;
    };
    // @ts-ignore
    const onSelectedItem = (selectedItem: Entity) => {
        openSection(Sections.Main);
        const normData = shellState.model.normalizedData;
        const { selectedItemsIds } = shellState.model;
        if (selectedItemsIds.indexOf(getModelId(selectedItem)) !== -1) {
            return;
        }
        shellState.services.updateFilter(selectedItem);

        const toReplaceId = selectedItemsIds.find((itemID) => {
            const item = normData[itemID];
            return item ? item.category === selectedItem.category : false;
        });

        if (toReplaceId) {
            replaceAsset(normData[toReplaceId], selectedItem);
            showModel(getModel(selectedItem));
            return;
        }

        addToTheScene(selectedItem);
    };

    const replaceAsset = (prevAsset: Entity, newAsset: Entity) => {
        if (prevAsset.category === newAsset.category) {
            hideModel(models[prevAsset.meshName]);
        }
        shellState.services.replace(prevAsset, newAsset);
    };

    const addToTheScene = (item: Entity) => {
        showModel(getModel(item));
        shellState.services.addSelectedItems(item);
    };

    const hideModel = (mesh: BABYLON.AbstractMesh) => {
        mesh.visibility = 0;
    };

    const getModel = (item: Entity) => {
        return models[item.meshName];
    };

    const orderRequest = () => {
        const orderModels = shellState.model.selectedItemsIds.map(id => shellState.model.normalizedData[id]);
        window.MainManikenUrlTarget.onOrder({
            selected: JSON.stringify(orderModels)
        });
    };

    const loadScreen = (s: BABYLON.Scene) => {
        const assetsManager = new BABYLON.AssetsManager(s);
        s.onDataLoadedObservable.add(() => {
            shellState.services.setLoading(false);
        });
        s.onMeshImportedObservable.add((mesh) => {
            loadedModels[mesh.name] = mesh;
        });
        const mainModel = assetsManager
            .addMeshTask(
                "base",
                "",
                (window as any).MainManikenUrlTarget.modelRoot,
                "armor.incremental.babylon"
            );
        mainModel.onSuccess = (task) => {
            models = task.loadedMeshes.reduce<Models>((result, mesh) => {
                if (mesh.name === "Podlatnik_red" || mesh.name === "Maniken") {
                    mesh.visibility = 1;
                } else {
                    mesh.visibility = 0;
                }
                result[mesh.name] = mesh;
                return result;
            }, {});
            shellState.services.setLoading(false);
        };
        assetsManager.onTaskError = (_) => {
            console.error("can not load image");
        };

        assetsManager.load();
    };

    return (
        <Container>
            { loading && <div css={ st.loading }>Loading....</div> }
            <div css={ st.headerNav }>
                <Header
                    onCenturyChange={ shellState.services.setSelectedCentury }
                    selectedCentury={ selectedCentury }
                    centuries={ centurieOptions }
                    usaChecked={ usaChecked }
                    ussaChecked={ ussaChecked }
                    onUsaChange={ onUsaChange }
                    onUssaChange={ onUssaChange }
                />
            </div>
            <div css={ st.canvasView }>
                <div css={ st.container }>
                    <MainView/>
                    <div css={ st.sideMenu }>
                        <SideMenu
                            stats={ shellState.services.getTotalItemsInCategory(shellState.services.getData()) }
                            onMenuItemSelected={ onCategorySelect }
                            data={ categories }
                        />
                    </div>
                </div>
                <Footer onOrderButtonClick={ openOrderSection }/>
                <AdditionalMenu onClose={ onSectionClose } open={ openedSection !== Sections.Main }>
                    { renderSection(openedSection) }
                </AdditionalMenu>
            </div>
        </Container>
    );

}
