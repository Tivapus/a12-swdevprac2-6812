"use client";

import { Provider as ReactReduxProvider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "../redux/store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </ReactReduxProvider>
    );
};

export default ReduxProvider;
