import { DragEvent, FC, useContext } from 'react';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const { description } = entry;

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('id', entry._id);
    startDragging();
  };

  const handleDragEnd = () => endDragging();

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <Typography variant="body2">hace 10 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
