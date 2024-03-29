import { ChangeEvent, useContext, useState } from 'react';

import { AddCircleOutlined, SaveOutlined } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  const { addEntry } = useContext(EntriesContext);
  const { addingEntry, setAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    if (inputValue.trim() === '') return;

    addEntry(inputValue);
    setInputValue('');
    setTouched(false);
    setAddingEntry(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1.5 }}>
      {addingEntry ? (
        <>
          <TextField
            value={inputValue}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            error={inputValue.length <= 0 && touched}
            helperText={
              inputValue.length <= 0 && touched && 'Ingrese un valor por favor'
            }
            sx={{ marginTop: 2, marginBottom: 1 }}
            fullWidth
            autoFocus
            multiline
            label="Nueva entrada"
          />

          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => setAddingEntry(false)} variant="text">
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              variant="outlined"
              color="secondary"
              startIcon={<SaveOutlined />}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          onClick={() => setAddingEntry(true)}
          startIcon={<AddCircleOutlined />}
          fullWidth
          variant="outlined"
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
