import Modal from "@/Components/Modal";
import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [options, setOptions] = useState({
        maxWidth: "2xl",
        closeable: true,
    });
    const showModal = (content, opts = {}) => {
        setModalContent(content);
        setOptions({ ...options, ...opts });
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setModalContent(null), 200);
    };
    return (
        <ModalContext.Provider value={{ showModal, closeModal }}>
            {children}
            <Modal
                show={isOpen}
                onClose={closeModal}
                maxWidth={options.maxWidth}
                closeable={options.closeable}
            >
                {modalContent}
            </Modal>
        </ModalContext.Provider>
    );
};
