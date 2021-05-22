interface Options {
    modelRoot?: string;
    onOrder?: (data: any) => void;
}
interface Window {
    InitWarrior: (id: string, options: Options) => void;
    MainManikenUrlTarget: {
        modelRoot: string;
        onOrder: (data: any) => void;
    };
}
