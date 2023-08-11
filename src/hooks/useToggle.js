import { useEffect, useState } from "react";

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => setIsOpen(true);
  const closeModalHandler = () => setIsOpen(false);
  useEffect(() => {
    return () => {
      closeModalHandler();
    };
  }, []);

  return {
    isOpen,
    onOpenModal: openModalHandler,
    onCloseModal: closeModalHandler,
  };
};
