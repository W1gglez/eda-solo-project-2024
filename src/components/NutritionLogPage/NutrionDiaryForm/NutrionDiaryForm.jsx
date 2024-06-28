import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
} from '@mui/joy';

export default function NutritionDiaryForm({ setDisplayForm, displayForm }) {
  const nutritionLog = useSelector((store) => store.nutritionLog);
  const date = useSelector((store) => store.date);
  const [newEntry, setNewEntry] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    console.log(newEntry);
    e.preventDefault();
    dispatch({
      type: 'ADD_ENTRY',
      payload: { ...newEntry, log_id: nutritionLog.log_id, date: date },
    });
    setDisplayForm(false);
  };

  console.table(nutritionLog);

  return (
    <Modal
      open={displayForm}
      onClose={() => setDisplayForm(false)}
    >
      <ModalDialog sx={{ bgcolor: '#d3d6db' }}>
        <ModalClose />

        <DialogTitle>New Entry</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <FormControl>
              <FormLabel
                sx={{ mb: 0.5 }}
                htmlFor='new-item-input'
              >
                Name
              </FormLabel>
              <Input
                autoComplete='off'
                sx={{
                  margin: '5px',
                  mb: '10px',
                  backgroundColor: '#d3d6db',
                  border: 'none',
                  boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                  '&:focus-within': {
                    border: 'none',
                  },
                  '&:focus-within::before': {
                    boxShadow:
                      ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                    borderRadius: '8px',
                  },
                }}
                id='new-item-input'
                type='text'
                onChange={(e) =>
                  setNewEntry({ ...newEntry, name: e.target.value })
                }
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel
                sx={{ mb: 0.5 }}
                htmlFor='new-item-calories'
              >
                Calories
              </FormLabel>
              <Input
                autoComplete='off'
                sx={{
                  margin: '5px',
                  mb: '10px',
                  backgroundColor: '#d3d6db',
                  border: 'none',
                  boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                  '&:focus-within': {
                    border: 'none',
                  },
                  '&:focus-within::before': {
                    boxShadow:
                      ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                    borderRadius: '8px',
                  },
                }}
                id='new-item-calories'
                type='text'
                onChange={(e) =>
                  setNewEntry({ ...newEntry, calories: Number(e.target.value) })
                }
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel
                sx={{ mb: 0.5 }}
                htmlFor='new-item-protein'
              >
                Protein
              </FormLabel>
              <Input
                autoComplete='off'
                sx={{
                  margin: '5px',
                  mb: '10px',
                  backgroundColor: '#d3d6db',
                  border: 'none',
                  boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                  '&:focus-within': {
                    border: 'none',
                  },
                  '&:focus-within::before': {
                    boxShadow:
                      ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                    borderRadius: '8px',
                  },
                }}
                placeholder='Optional'
                id='new-item-protein'
                type='text'
                onChange={(e) =>
                  setNewEntry({ ...newEntry, protein: Number(e.target.value) })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel
                sx={{ mb: 0.5 }}
                htmlFor='new-item-carbs'
              >
                Carbohydrates
              </FormLabel>
              <Input
                autoComplete='off'
                sx={{
                  margin: '5px',
                  mb: '10px',
                  backgroundColor: '#d3d6db',
                  border: 'none',
                  boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                  '&:focus-within': {
                    border: 'none',
                  },
                  '&:focus-within::before': {
                    boxShadow:
                      ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                    borderRadius: '8px',
                  },
                }}
                placeholder='Optional'
                id='new-item-carbs'
                type='text'
                onChange={(e) =>
                  setNewEntry({ ...newEntry, carbs: Number(e.target.value) })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel
                sx={{ mb: 0.5 }}
                htmlFor='new-item-fat'
              >
                Fats
              </FormLabel>
              <Input
                autoComplete='off'
                sx={{
                  margin: '5px',
                  mb: '10px',
                  backgroundColor: '#d3d6db',
                  border: 'none',
                  boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                  '&:focus-within': {
                    border: 'none',
                  },
                  '&:focus-within::before': {
                    boxShadow:
                      ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                    borderRadius: '8px',
                  },
                }}
                placeholder='Optional'
                id='new-item-fat'
                type='text'
                onChange={(e) =>
                  setNewEntry({ ...newEntry, fats: Number(e.target.value) })
                }
              />
            </FormControl>
            <Button
              sx={{
                background: '#be3144',
                ':hover': { backgroundColor: '#9e2837', opacity: '95%' },
              }}
              type='submit'
            >
              Submit
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
