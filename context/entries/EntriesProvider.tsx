import { FC, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

const UI_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'descripcion de prueba 1',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'descripcion de prueba 2',
      status: 'in-progress',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'descripcion de prueba 3',
      status: 'finished',
      createdAt: Date.now(),
    },
  ],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, UI_INITIAL_STATE);

  return (
    <EntriesContext.Provider value={{ ...state }}>
      {children}
    </EntriesContext.Provider>
  );
};