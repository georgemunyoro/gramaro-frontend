import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

import App from "./App";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

ReactDOM.render(<Provider store = {store}><React.StrictMode><App />
                </React.StrictMode>
  </Provider>,
                document.getElementById("root"));
