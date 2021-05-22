// get babylon file
// create assets put to schema folder
// read form schema folder assets, exclude some
// create json file ["assetsName"]
const makeIncremental = require("babylonjs-make-incremental").makeIncremental;
const filename = "some.babylonjs";

makeIncremental(
    "../assets",
);
