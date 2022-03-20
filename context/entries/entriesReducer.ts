import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesType =
  | { type: 'Entry - Add'; payload: Entry }
  | { type: 'Entry - Update'; payload: Entry }
  | { type: 'Entry - Get All'; payload: Entry[] };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesType
): EntriesState => {
  switch (action.type) {
    case 'Entry - Add':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case 'Entry - Update':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            // entry.description = action.payload.description
          }
          return entry;
        }),
      };

    case 'Entry - Get All':
      return {
        ...state,
        entries: [...action.payload],
      };

    default:
      return state;
  }
};
