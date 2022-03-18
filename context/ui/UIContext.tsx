import { createContext } from 'react';

interface ContextProps {
  showMenu: boolean;
  // metodos
  openMenu: () => void;
  closeMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
