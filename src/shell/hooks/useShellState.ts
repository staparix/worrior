import { useState } from "react";
import { Category, Century, Country, Entity, getModelId } from "../../domain";
import { Option } from "../../components/select/Select";

export enum Sections {
    Category = "category",
    Ordering = "ordering",
    Main = "main",
}

type InitialData = {
    shoppingCartOpened: boolean,
    categories: Category[],
    centuries: Century[],
    selectedCategory: number,
    data: Entity[],
    normalizedEntities: {[key: number]: Entity},
};

export type TotalItemsInCategory = Record<Category["id"], number>;

type UseShellState = {
    model: {
        readonly data: Entity[];
        readonly normalizedData: {[key: number]: Entity};
        readonly shoppingCartOpened: boolean;
        readonly selectedItemsIds: Entity["id"][];
        readonly categories: Category[];
        readonly centuries: Century[];
        readonly selectedCentury: Option[];
        readonly selectedCategory: Category["id"] | undefined,
        readonly ussaChecked: boolean,
        readonly usaChecked: boolean,
        readonly selectedCountry: Country["id"],
        readonly loading: boolean,
        readonly openedSection: Sections,
    },
    services: {
        openSection(section: Sections): void;
        setSelectedCategory(category: Category["id"]): void;
        removeItemFromSelected(item: Entity): void;
        addSelectedItems(item: Entity): void;
        setLoading(loading: boolean): void;
        initData(data: InitialData): void;
        setSelectedCountry(c: Country["id"]): void;
        removeFromSelected(id: Entity["id"]): void;
        setUssaCheckbox(checked: boolean): void;
        setUsaCheckbox(checked: boolean): void;
        setSelectedCentury(c: Option[]): void;
        getData(): Entity[];
        replace(prevAsset: Entity, newAsset: Entity): void;
        getTotalItemsInCategory(items: Entity[]): TotalItemsInCategory;
        updateFilter(item: Entity): void;
    }
};

export function useShellState(): UseShellState {
    const [shoppingCartOpened, setShoppingCartOpenend] = useState(false);
    const [data, setData] = useState<Entity[]>([]);
    const [normalizedData, setNormalizedData] = useState<{[key: number]: Entity}>({});
    const [selectedItemsIds, setSelectedIds] = useState<number[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [centuries, setCenturies] = useState<Century[]>([]);
    const [selectedCentury, setSelectedCentury] = useState<Option[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category["id"] | undefined>(undefined);
    const [easternChecked, setEasternCheckbox] = useState<boolean>(true);
    const [westernSelected, setWesternCheckbox] = useState<boolean>(true);
    const [selectedCountry, setSelectedCountry] = useState<Country["id"]>(1);
    const [loading, setLoading] = useState(true);
    const [openedSection, setOpenedSection] = useState(Sections.Main);

    return {
        services: {
            setSelectedCentury,
            openSection(section: Sections) {
                setOpenedSection(section);
            },
            setSelectedCategory,
            removeItemFromSelected(entity: Entity) {
                const newSelected = selectedItemsIds
                    .filter(id => id !== getModelId(entity));
                setSelectedIds(newSelected);
            },
            addSelectedItems(item: Entity) {
                setSelectedIds([getModelId(item), ...selectedItemsIds]);
            },
            setLoading,
            initData(initialData) {
                setShoppingCartOpenend(initialData.shoppingCartOpened);
                setCategories(initialData.categories);
                setCenturies(initialData.centuries);
                setSelectedCategory(initialData.selectedCategory);
                setData(initialData.data);
                setNormalizedData(initialData.normalizedEntities);
            },
            setSelectedCountry,
            setUssaCheckbox: setEasternCheckbox,
            setUsaCheckbox: setWesternCheckbox,
            removeFromSelected(id: number) {
                const ids = selectedItemsIds.filter((iID) => id !== iID)
                setSelectedIds(ids);
            },
            replace: (prevAsset, newAsset) => {
                const ids = selectedItemsIds.filter((iID) => getModelId(prevAsset) !== iID);
                setSelectedIds([getModelId(newAsset), ...ids]);
            },
            getData: () => {
                const filters = [];
                const selected: number[] = [];
                if (westernSelected) {
                    selected.push(2);
                }
                if (easternChecked) {
                    selected.push(1);
                }
                if (selectedCentury.length > 0) {
                    filters.push((item: Entity) => item.century
                        .some(c => getIds(selectedCentury).indexOf(c) !== -1));
                }
                filters.push((item: Entity) => selected.indexOf(item.country) !== -1);

                let newData = data;
                filters.forEach((filterFn) => {
                    newData = newData.filter(filterFn);
                });

                return newData;
            },
            getTotalItemsInCategory: (entities: Entity[]) => {
                const result = categories.reduce<TotalItemsInCategory>((totalResult, c) => {
                    let count = 0;
                    entities.forEach((e) => {
                        if (c.id === e.category) {
                            count += 1;
                        }
                    });
                    totalResult[c.id] = count;
                    return totalResult;
                }, {} as any) as TotalItemsInCategory;
                return result;
            },
            updateFilter: (item: Entity) => {
                if (item.country === 1) {
                    setEasternCheckbox(true);
                    setWesternCheckbox(false);
                } else {
                    setEasternCheckbox(false);
                    setWesternCheckbox(true);
                }
                setSelectedCentury(toOptions(item.century));
            }
        },
        model: {
            shoppingCartOpened,
            data,
            selectedItemsIds,
            categories,
            centuries,
            selectedCategory,
            selectedCountry,
            loading,
            openedSection,
            selectedCentury,
            normalizedData,
            usaChecked: westernSelected,
            ussaChecked: easternChecked,
        }
    };
}

const centuryToOption = (c: number): Option => ({
    id: c,
    displayName: String(c)
});

const getId = (option: Option) => option.id;
const getIds = (options: Option[]) => options.map(getId);
const toOptions = (options: number[]): Option[] => options.map(centuryToOption);
