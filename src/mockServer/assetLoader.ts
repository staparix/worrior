import * as BABAYLON from "babylonjs";
import * as shortID from "shortid";

export const MainManeken = "m.obj";

export enum County {
    Finland = "Finland",
    Italy = "Italy",
}

export enum Category {
    Helmets = "helmets",
    Body = "body",
    Calf = "calf",
    Trapka = "trapka",
    Bedro = "bedro",
    Nanosnik = "nanosnik",
    Elbows = "Elbows",
    Forearm = "Forearm",
    Knee = "Knee",
    Sabatons = "Sabatons",
    Shoulders = "Shoulders",
    Thigh = "Thigh",
}

export type Entity = {
    id: string,
    category: Category;
    country: County;
    century: number;
    meta: {
        assetName: string;
        position?: {
            x: number;
            y: number;
            z: number;
        }
    }
};

export const fetchData = (): Entity[] => {
    return [
        {
            id: shortID.generate(),
            category: Category.Body,
            country: County.Finland,
            century: 15,
            meta: {
                assetName: "body_1.obj"
            }
        },
        {
            id: shortID.generate(),
            category: Category.Calf,
            country: County.Finland,
            century: 15,
            meta: {
                assetName: "Dvustvor_nepolnie.obj"
            }
        },
        {
            id: shortID.generate(),
            category: Category.Elbows,
            country: County.Finland,
            century: 15,
            meta: {
                assetName: "Eiropa.obj",
                position: {
                    x: 0,
                    y: -40,
                    z: 45,
                }
            }
        },
        {
            id: shortID.generate(),
            category: Category.Forearm,
            country: County.Finland,
            century: 15,
            meta: {
                assetName: "Eiropa_naruch.obj",
            }
        },
        {
            id: shortID.generate(),
            category: Category.Knee,
            country: County.Finland,
            century: 15,
            meta: {
                assetName: "Eiropa_obichnie.obj",
            }
        },
        {
            id: shortID.generate(),
            category: Category.Trapka,
            country: County.Finland,
            century: 15,
            meta: {
                assetName: "podlatnik.obj",
            }
        },
        {
            id: shortID.generate(),
            category: Category.Sabatons,
            country: County.Finland,
            century: 15,
            meta: {
                assetName: "Latnie.obj",
                position: {
                    x: 0,
                    y: 50,
                    z: 0,
                }
            }
        },
        {
            id: shortID.generate(),
            category: Category.Shoulders,
            country: County.Finland,
            century: 15,
            meta: {
                assetName: "Segmentarnie.obj",
            }
        },
        {
            id: shortID.generate(),
            category: Category.Thigh,
            country: County.Finland,
            century: 15,
            meta: {
                assetName: "Bedro.obj",
            }
        },
        {
            id: shortID.generate(),
            category: Category.Helmets,
            country: County.Finland,
            century: 15,
            meta: {
                assetName: "Nanosnik.obj",
            }
        },
    ];
};

export function getContries(entries: Entity[]) {
    return entries.map(entry => entry.country);
}

export function getCategory(entries: Entity[]) {
    return entries.map(entry => entry.category);
}

export function findByCategory(category: Category, entries: Entity[]) {
    return entries.filter(entry => entry.category === category);
}

export function findByCentry(century: number, entries: Entity[]) {
    return entries.filter(entry => entry.century === century);
}

export function getAllCategories(entries: Entity[]) {
    const filter: any = {};
    return entries.reduce<Category[]>((result, item) => {
        if (!filter[item.category]) {
            filter[item.category] = item.category;
            result.push(item.category);
            return result;
        }
        return result;
    }, []);
}

export function getAllCenturies(entries: Entity[]) {
    const filter: any = {};
    return entries.reduce<number[]>((result, item) => {
        if (!filter[item.century]) {
            filter[item.century] = item.century;
            result.push(item.century);
            return result;
        }
        return result;
    }, []);
}

export function getAllCountry(entries: Entity[]) {
    const filter: any = {};
    return entries.reduce<County[]>((result, item) => {
        if (!filter[item.country]) {
            filter[item.country] = item.country;
            result.push(item.country);
            return result;
        }
        return result;
    }, []);
}

export const getFilteredData = (data: Entity[], century: number, country: County, category: Category) => {
    return data
        .filter((item) => {
            return item.century === century;
        })
        .filter((item) => {
            return item.country === country;
        })
        .filter((item) => {
            return item.category === category;
        });
};

export const getPositionByAssetName = (assetName: string, assets: Entity[]): BABAYLON.Vector3 => {
    const item = assets.find(value => value.meta.assetName === assetName);
    if (item && item.meta.position) {
        const {x = 0, y = 0, z = 0} = item.meta.position;
        return new BABAYLON.Vector3(x, y, z);
    }
    return BABAYLON.Vector3.Zero();
};

export const getById = (id: string, data: Entity[]) => {
    return data.find(item => item.id === id);
}
