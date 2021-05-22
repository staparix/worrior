import { Category, Century, Entity } from "../domain";
import { loadCategories, loadCenturies, loadCountries, loadModels } from "../network/armorAPI";
import { parseCategories, parseCenturies, parseCounties, parseEntity } from "../parsers/parsers";

export function findByCategory(categoryId: Category["id"] | undefined, entries: Entity[]) {
    if (categoryId === undefined) {
        return [];
    }
    return entries.filter(entry => entry.category === categoryId);
}

export function getAllCategories() {
    return loadCategories().then(value => parseCategories(value));
}

export function getAllCenturies() {
    return loadCenturies().then(value => parseCenturies(value));
}

export function getAllCountries() {
    return loadCountries().then(value => parseCounties(value));
}

export function getAllModels() {
    return loadModels().then(value => parseEntity(value));
}

export function toOptions(centuries: Century[]) {
    return centuries.map(c => ({ id: c.id, displayName: c.displayName }));
}
