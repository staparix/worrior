const fs = require("fs");
fs.readdir("../assets", (err, files) => {
    const resutl = [];

    files.forEach(file => {
        if (file.indexOf("babylonmeshdata") > 0) {
            resutl.push(file.substring(6, file.indexOf(".babylonmeshdata")));
        }
    });
    console.log(JSON.stringify(resutl.filter(Boolean)))
});
