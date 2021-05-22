import { Category, Century, Country, Entity } from "../domain";

export interface RawCategories {
    id: number;
    name: string;
}

export interface RawCentury {
    id: number;
    name: string;
}

export interface RawCountries {
    id: number;
    name: string;
}

export type RawEntity = {
    id: number,
    category: number;
    country: number;
    century: number[] | number;
    imgUrl?: string;
    asset: number;
    displayName: string;
    assetName: string;
};

export const parseCategories = (categories: RawCategories[]) => {
    if (!categories) {
        throw new Error("no categories found");
    }

    return categories.map(({ name, id }) => new Category(name, Number(id)));
};

export const parseCenturies = (centuries: RawCentury[]) => {
    if (!centuries) {
        throw new Error("no categories found");
    }

    return centuries.map(({ name, id }) => new Century(name, Number(id)));
};

export const parseCounties = (centuries: RawCountries[]) => {
    if (!centuries) {
        throw new Error("no countries found");
    }

    return centuries.map(({ name, id }) => new Country(name, Number(id)));
};

export const parseEntity = (entities: RawEntity[]) => {
    if (!entities) {
        throw new Error("no categories found");
    }

    return entities.map((e) => {
        return new Entity(e);
    });
};

export const normalizeEntities = (entities: Entity[]): { [key: number]: Entity } => {
    return entities.reduce<{ [key: number]: Entity } >((result, entity) => {
        result[entity.id] = entity;
        return result;
    }, {});
};
