import { RawEntity } from "./parsers/parsers";

export class Country {
    public readonly id: number;
    public readonly displayName: string;

    constructor(displayName: string, id: number) {
        this.id = id;
        this.displayName = displayName;
    }
}

export class Century {
    public readonly id: number;
    public readonly displayName: string;

    constructor(displayName: string, id: number) {
        this.id = id;
        this.displayName = displayName;
    }
}

export class Category {
    public readonly id: number;
    public readonly displayName: string;

    constructor(displayName: string, id: number) {
        this.id = id;
        this.displayName = displayName;
    }
}

export class Entity {
    public readonly id: number;
    public readonly displayName: string;
    public readonly category: number;
    public readonly century: number[];
    public readonly country: number;
    public readonly imgUrl?: string;
    public readonly asset: number;
    public readonly meshName: string;

    constructor(data: RawEntity) {
        this.id = Number(data.id);
        this.displayName = data.displayName;
        this.category = Number(data.category);
        this.century = Array.isArray(data.century) ? data.century.map(Number) : [data.century];
        this.country = Number(data.country);
        this.imgUrl = data.imgUrl || "http://via.placeholder.com/640x360";
        this.asset = data.asset;
        this.meshName = data.assetName;
    }
}

export const getModelId = (item: Entity) => {
    return item.id;
};
