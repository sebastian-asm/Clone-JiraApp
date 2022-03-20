import { FC, useReducer, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

const UI_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, UI_INITIAL_STATE);

  useEffect(() => {
    const getAllEntries = async () => {
      const { data } = await entriesApi.get('/entries');
      const entries: Entry[] = data.entries;

      dispatch({
        type: 'Entry - Get All',
        payload: entries,
      });
    };
    getAllEntries();
  }, []);

  const addEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending',
    };

    dispatch({
      type: 'Entry - Add',
      payload: newEntry,
    });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({
      type: 'Entry - Update',
      payload: entry,
    });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
