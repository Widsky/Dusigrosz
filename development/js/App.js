import React from "react";
import ReactDOM from "react-dom";
import "../scss/main.scss"

import {Income} from "./Income";


const App = () => {
    return (
        <>
            <Income/>
        </>
    );
}


ReactDOM.render(<App/>, document.getElementById("app"));
