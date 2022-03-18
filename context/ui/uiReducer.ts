import { UIState } from './';

type UIType = { type: 'UI - Open Menu' } | { type: 'UI - Close Menu' };

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

    default:
      return state;
  }
};
