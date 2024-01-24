import { ReactNode, useCallback, useEffect, useId } from "react";

export interface ModalProps {
  visible?: boolean;
  onClose?(): void;
}

interface Props extends ModalProps {
  children: ReactNode;
}

export default function ModalContainer({ children, visible, onClose }: Props) {
  const containerId = useId();
  const handleClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);
  const handleClick = ({ target }: any) => {
    if (target.id === containerId) handleClose();
  };

  useEffect(() => {
    const closeModal = ({ key }: any) => key === "Escape" && handleClose();

    document.addEventListener("keydown", closeModal);
    return () => document.removeEventListener("keydown", closeModal);
  }, [handleClose]);

  if (!visible) return null;
  return (
    <div
      id={containerId}
      onClick={handleClick}
      className='fixed z-100 inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] flex items-center justify-center'
    >
      {children}
    </div>
  );
}
