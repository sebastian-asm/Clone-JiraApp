import { EntriesState } from './';

type EntriesType =
  | { type: 'Entries - Open Menu' }
  | { type: 'UI - Close Menu' };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesType
): EntriesState => {
  switch (action.type) {
    default:
      return state;
  }
};
