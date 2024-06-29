import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NutritionLogDisplay from './NutritionLogDisplay/NutritionLogDisplay';
import NutritionDiaryForm from './NutrionDiaryForm/NutrionDiaryForm';
import DateSelector from '../DateSelector/DateSelector';
import { Button, Container, Grid, Typography } from '@mui/joy';

export default function NutritionLogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const nutritionLog = useSelector((store) => store.nutritionLog);
  const date = useSelector((store) => store.date);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch({
      type: 'FETCH_TRACKER',
      payload: { date: date },
    });
    setIsLoading(false);
  }, [date]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: '90vw',
          maxWidth: '400px',
          justifyContent: 'center',
        }}
      >
        <Grid
          xs={12}
          sx={{ textAlign: 'center' }}
        >
          <Typography level='h3'>Nutrition Log</Typography>
        </Grid>
        <Grid
          xs={12}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <DateSelector />
        </Grid>

        <NutritionDiaryForm
          displayForm={displayForm}
          setDisplayForm={setDisplayForm}
        />

        {isLoading ? (
          <></>
        ) : (
          <>
            {nutritionLog.log_id && <NutritionLogDisplay />}
            <Grid
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                sx={{
                  background: '#be3144',
                  ':hover': { backgroundColor: '#9e2837', opacity: '95%' },
                }}
                onClick={() => setDisplayForm(true)}
              >
                Add Entry
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}
