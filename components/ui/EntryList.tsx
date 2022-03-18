import { List, Paper } from '@mui/material';

import { EntryCard } from './';

export const EntryList = () => {
  return (
    <div>
      <Paper
        sx={{
          height: 'calc(100vh - 200px)',
          overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: 1,
        }}
      >
        <List sx={{ opacity: 1 }}>
          <EntryCard />
        </List>
      </Paper>
    </div>
  );
};
