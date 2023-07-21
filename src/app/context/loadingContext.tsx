"use client";

import { createContext, ReactNode, useContext, useState } from "react";

// * The initialGameContext is used to set the initial value of the GameContext.
const initialLoadingContext = {loading: false};

// * The LoadingProvider component is used to fetch the loading state and
// * provide it to the app via the LoadingProvider.
export const LoadingContext = createContext({loading: false, setLoading: () => {}});

// * The LoadingContext is used by the useLoading hook to provide the
// * loading state data to the app.
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);

    const data = { loading, setLoading };

    return <LoadingContext.Provider value={{ data }}>{children}</LoadingContext.Provider>;
};
