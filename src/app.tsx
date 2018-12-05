import * as React from "react";
import { render } from "react-dom";
const rootElement = document.getElementById("app")!;
const HelloWorld: React.FunctionComponent = () => {
    const [count, setCounter] = React.useState(0);
    const increment = () => {
        setCounter(count + 1);
    };
    return (
        <>
            <div>Counter...{count}</div>
            <button onClick={increment}>+</button>
        </>
    );
};

render(<HelloWorld />, rootElement);
