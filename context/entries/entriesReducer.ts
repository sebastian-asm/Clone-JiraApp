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
      const { _id, status, description } = action.payload;
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === _id) {
            entry.status = status;
            entry.description = description;
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
