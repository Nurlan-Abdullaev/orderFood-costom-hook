import { useToggle } from "../hooks/useToggle";
import React from "react";

export const ModalContext = React.createContext({
  isModalOpen: false,
  onClose: () => {},
  onOpen: () => {},
});

export const ModalProvider = ({ children }) => {
  const { isOpen, onCloseModal, onOpenModal } = useToggle();

  return (
    <ModalContext.Provider
      value={{
        isModalOpen: isOpen,
        onClose: onCloseModal,
        onOpen: onOpenModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
