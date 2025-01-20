import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {

    const [modelProgress, setModelProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    return <LoadingContext.Provider value={{
        modelProgress, setModelProgress,
        loading, setLoading
    }}>
        {children}
    </LoadingContext.Provider>
}

export function useLoading(){
    return useContext(LoadingContext);
}