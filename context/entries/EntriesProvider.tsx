import { FC, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();
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

  const deleteEntry = async (id: string, showSnackBar = false) => {
    const { data } = await entriesApi.delete<Entry>(`/entries/${id}`);

    if (showSnackBar) {
      enqueueSnackbar('Entrada eliminada', {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }

    dispatch({
      type: 'Entry - Delete',
      payload: data,
    });

    router.replace('/');
  };

  return (
    <EntriesContext.Provider
      value={{ ...state, addEntry, updateEntry, deleteEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
