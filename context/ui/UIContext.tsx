import { createContext } from 'react';

interface ContextProps {
  showMenu: boolean;
  addingEntry: boolean;
  isDragging: boolean;
  // metodos
  openMenu: () => void;
  closeMenu: () => void;
  setAddingEntry: (isAdding: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
