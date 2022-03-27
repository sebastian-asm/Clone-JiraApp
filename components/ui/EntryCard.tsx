import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

import { date } from '../../utils/';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { push } = useRouter();
  const { startDragging, endDragging } = useContext(UIContext);
  const { description, _id, createdAt } = entry;

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('id', _id);
    startDragging();
  };

  const handleDragEnd = () => endDragging();

  const handleClick = () => push(`/entries/${_id}`);

  return (
    <Card
      onClick={handleClick}
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
          <Typography variant="body2">
            hace {date.distanceToNow(createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
