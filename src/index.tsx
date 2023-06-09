import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./reducer/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const persistor = persistStore(store);

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </PersistGate>
    </Provider>
);
