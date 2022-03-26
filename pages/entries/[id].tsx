import { ChangeEvent, useState, useMemo } from 'react';

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
import { EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

export default function EntryPage() {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<EntryStatus>('pending');
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
    console.log({ inputValue, status });
  };

  return (
    <Layout title="">
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title="Entrada" subheader="Entrada creada el" />
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
}
