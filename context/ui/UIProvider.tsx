import { FC, useReducer } from 'react';

import { UIContext, uiReducer } from './';

export interface UIState {
  showMenu: boolean;
}

const UI_INITIAL_STATE: UIState = {
  showMenu: false,
};

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openMenu = () => {
    dispatch({
      type: 'UI - Open Menu',
    });
  };

  const closeMenu = () => {
    dispatch({
      type: 'UI - Close Menu',
    });
  };

  return (
    <UIContext.Provider value={{ ...state, openMenu, closeMenu }}>
      {children}
    </UIContext.Provider>
  );
};
