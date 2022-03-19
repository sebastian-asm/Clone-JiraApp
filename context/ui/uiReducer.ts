import { UIState } from './';

type UIType =
  | { type: 'UI - Open Menu' }
  | { type: 'UI - Close Menu' }
  | { type: 'UI - Set Adding Entry'; payload: boolean }
  | { type: 'UI - Start Dragging' }
  | { type: 'UI - End Dragging' };

export const uiReducer = (state: UIState, action: UIType): UIState => {
  switch (action.type) {
    case 'UI - Open Menu':
      return {
        ...state,
        showMenu: true,
      };

    case 'UI - Close Menu':
      return {
        ...state,
        showMenu: false,
      };

    case 'UI - Set Adding Entry':
      return {
        ...state,
        addingEntry: action.payload,
      };

    case 'UI - Start Dragging':
      return {
        ...state,
        isDragging: true,
      };

    case 'UI - End Dragging':
      return {
        ...state,
        isDragging: false,
      };

    default:
      return state;
  }
};
