import { DragEvent, FC, useContext, useMemo } from 'react';

import { List, Paper } from '@mui/material';

import { EntryCard } from './';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  // aplicando memorizacion para que react solo renderize cuando hay nuevas entradas
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('id');
    // ! le indica a ts que siempre se recibira un valor
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status; // actualizando el estado de la entrada
    updateEntry(entry);
    endDragging();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 200px)',
          overflowY: 'scroll',
          backgroundColor: 'transparent',
          paddingX: 1.5,
        }}
      >
        <List
          sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all 0.3s ease' }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
