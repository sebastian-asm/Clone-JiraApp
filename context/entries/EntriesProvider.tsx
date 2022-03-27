import { FC, useReducer, useEffect } from 'react';

import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getAllEntries = async () => {
      const { data } = await entriesApi.get<Entry[]>('/entries');
      dispatch({
        type: 'Entry - Get All',
        payload: data,
      });
    };
    getAllEntries();
  }, []);

  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({
      type: 'Entry - Add',
      payload: data,
    });
  };

  const updateEntry = async (entry: Entry, showSnackBar = false) => {
    const { _id, description, status } = entry;
    const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
      description,
      status,
    });

    if (showSnackBar) {
      enqueueSnackbar('Entrada actualizada', {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }

    dispatch({
      type: 'Entry - Update',
      payload: data,
    });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
