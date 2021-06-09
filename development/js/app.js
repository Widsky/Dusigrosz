import React from "react";
import ReactDOM from "react-dom";

import "../scss/main.scss"

import {Custom} from "./header";

const App = () => {
    return <Custom/>
}



ReactDOM.render(<App/>, document.getElementById("header"));
