export function loadImages(basePath: string, imageUrls: ReadonlyArray<string>): Promise<any> {
    const imgPromises = imageUrls.map((url) => {
        return loadImage(`${ basePath }/${ url }`);
    });
    return Promise.all(imgPromises);
}

function loadImage(url: string) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
        img.onload = resolve;
    });
};
