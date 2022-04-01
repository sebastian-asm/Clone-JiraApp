import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
  IconButton,
} from '@mui/material';
import { DeleteOutline, SaveOutlined } from '@mui/icons-material';

import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../db';
import { EntriesContext } from '../../context/entries';
import { date } from '../../utils';

interface Props {
  entry: Entry;
}

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  // memorizando el valor del input para evitar renderizados innecesarios
  const notValidInput = useMemo(() => inputValue.length === 0 && touched, [
    inputValue,
    touched,
  ]);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const handleStatusChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setStatus(target.value as EntryStatus);
  };

  const handleClick = () => {
    if (inputValue.trim().length === 0) return;
    updateEntry(
      {
        ...entry,
        status,
        description: inputValue,
      },
      true
    );
  };

  const handleDelete = (id: string) => {
    deleteEntry(id, true);
  };

  return (
    <Layout title={`Entrada: ${inputValue}`}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entrada"
              subheader={`Creada hace ${date.distanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                value={inputValue}
                onChange={handleInputChange}
                sx={{ marginTop: 2, marginBottom: 2 }}
                fullWidth
                autoFocus
                multiline
                label="Nueva entrada"
                onBlur={() => setTouched(true)}
                error={notValidInput}
                helperText={notValidInput && 'Ingrese una entrada por favor'}
              />
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup value={status} onChange={handleStatusChange} row>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      label={capitalize(option)}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                disabled={inputValue.length === 0}
                onClick={handleClick}
                startIcon={<SaveOutlined />}
                variant="contained"
                fullWidth
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        onClick={() => handleDelete(entry._id)}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'red',
        }}
      >
        <DeleteOutline />
      </IconButton>
    </Layout>
  );
};

// SSR: solo utilizar esta tecnica para construir la pagina una vez que el usuario
// hace la solicitud (request bajo demanda), para evitar el contenido estatico
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryById(id);

  if (!entry)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: { entry },
  };
};

export default EntryPage;
