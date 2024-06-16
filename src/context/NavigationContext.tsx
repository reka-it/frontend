import React, { createContext, ReactNode, useContext, useState } from 'react';

interface NavigationContextProps {
    targetSection: string | null;
    setTargetSection: React.Dispatch<React.SetStateAction<string | null>>;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

type NavigationProviderProps = {
    children: ReactNode;
};

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
    const [targetSection, setTargetSection] = useState<string | null>(null);

    return (
        <NavigationContext.Provider value={{ targetSection, setTargetSection }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = (): NavigationContextProps => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
