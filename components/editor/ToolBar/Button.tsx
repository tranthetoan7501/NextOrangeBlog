import { MouseEventHandler, ReactNode, useCallback } from "react";

interface Props {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  active,
  disabled,
  onMouseDown,
  onClick,
}: Props) {
  const getActiveStyle = useCallback((): string => {
    if (active) {
      return "dark:bg-primary dark:text-primary-dark bg-primary-dark text-primary bg-gray-500";
    } else return "text-secondary-light bg-secondary-dark bg-gray-300";
  }, [active]);

  const commonClasses =
    "p-2 border rounded text-lg hover:scale-110 hover:shadow-md transition relative ";

  return (
    <button
      type='button'
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={commonClasses + getActiveStyle()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
