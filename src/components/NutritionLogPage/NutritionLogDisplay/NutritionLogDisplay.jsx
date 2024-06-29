import { useSelector } from 'react-redux';
import NutritionLogProgressBars from './NutritionLogProgressBars/NutritionLogProgressBars';
import NutritionLogDisplayItem from './NutritionLogDisplayItem/NutritionLogDisplayItem';
import { Grid, Stack } from '@mui/joy';

export default function NutritionLogDisplay() {
  const nutritionLog = useSelector((store) => store.nutritionLog);
  const date = useSelector((store) => store.date);

  const isAllValuesNull = (obj) => {
    return Object.values(obj).every((value) => value === null);
  };

  return (
    <Grid
      xs={12}
      sx={{ display: 'flex', justifyContent: 'center', width: '85vw' }}
    >
      {' '}
      {isAllValuesNull(nutritionLog.log_entrys[0]) ? (
        <p>Add Entry to start tracking</p>
      ) : (
        <Stack
          spacing={2}
          sx={{ flex: 1 }}
        >
          <NutritionLogProgressBars />

          {nutritionLog.log_entrys.map((f) => {
            return (
              <NutritionLogDisplayItem
                f={f}
                key={f.entry_id}
              />
            );
          })}
        </Stack>
      )}
    </Grid>
  );
}
