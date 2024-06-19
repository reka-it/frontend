import {createContext, useContext, useState, ReactNode, Dispatch, SetStateAction} from 'react';

interface ModalContextType {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    openModal: () => void;
    closeModal: () => void;
    dataRef: string;
    setDataRef: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [dataRef, setDataRef] = useState<string>("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, dataRef, setDataRef, setIsModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
