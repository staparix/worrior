import * as React from "react";
import { render } from "react-dom";
import { Shell } from "./shell/Shell";
const rootElement = document.getElementById("app")!;
const App: React.FunctionComponent = () => {
    return (
        <>
            <Shell />
        </>
    );
};

render(<App />, rootElement);
