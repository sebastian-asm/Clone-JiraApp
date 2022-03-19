import { FC, useReducer } from 'react';

import { UIContext, uiReducer } from './';

export interface UIState {
  showMenu: boolean;
  addingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  showMenu: false,
  addingEntry: false,
  isDragging: false,
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

  const setAddingEntry = (isAdding: boolean) => {
    dispatch({
      type: 'UI - Set Adding Entry',
      payload: isAdding,
    });
  };

  const startDragging = () => {
    dispatch({
      type: 'UI - Start Dragging',
    });
  };

  const endDragging = () => {
    dispatch({
      type: 'UI - End Dragging',
    });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openMenu,
        closeMenu,
        setAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
