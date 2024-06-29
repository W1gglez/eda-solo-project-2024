import { useSelector } from 'react-redux';
import {
  Card,
  Grid,
  CircularProgress,
  Typography,
  Box,
  Divider,
} from '@mui/joy';

export default function NutritionLogProgressBars() {
  const nutritionLog = useSelector((store) => store.nutritionLog);
  const user = useSelector((store) => store.user);
  return (
    <Grid
      container
      xs={12}
      columnSpacing={2}
      rowSpacing={2}
    >
      <Grid xs={12}>
        <Card
          orientation='horizontal'
          sx={{
            p: 0,
            bgcolor: 'inherit',
            boxShadow: '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Grid xs={6}>
            <Typography level='title-md'>Calories</Typography>
            <Typography level='body-sm'>
              {nutritionLog.total_calories}/{user.bmr}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <CircularProgress
              sx={{
                '--CircularProgress-progressColor': '#991c1c' /*'#2e3da3' */,
                '--CircularProgress-trackColor': '#c1c4c9',
              }}
              size='lg'
              determinate
              value={(nutritionLog.total_calories / user.bmr) * 100}
              max={user.bmr}
            ></CircularProgress>
          </Grid>
        </Card>
      </Grid>
      {nutritionLog.total_protein && (
        <Grid
          xs={4}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card
            sx={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,

              bgcolor: 'inherit',
              boxShadow: '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
            }}
          >
            <Typography level='title-md'>Protein</Typography>
            <Typography level='body-sm'>
              {nutritionLog.total_protein}/{Math.round((user.bmr * 0.35) / 4)}g
            </Typography>
            <CircularProgress
              sx={{
                '--CircularProgress-progressColor': '#418511',
                '--CircularProgress-trackColor': '#c1c4c9',
                '--CircularProgress-progressThickness': '5px',
              }}
              size='md'
              color='success'
              determinate
              value={
                (nutritionLog.total_protein /
                  Math.round((user.bmr * 0.35) / 4)) *
                100
              }
              max={Math.round((user.bmr * 0.35) / 4)}
            ></CircularProgress>
          </Card>
        </Grid>
      )}
      {nutritionLog.total_carbs && (
        <Grid
          xs={4}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card
            sx={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,

              bgcolor: 'inherit',
              boxShadow: '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
            }}
          >
            <Typography level='title-md'>Carbs</Typography>
            <Typography level='body-sm'>
              {nutritionLog.total_carbs}/ {Math.round((user.bmr * 0.35) / 4)}g
            </Typography>
            <CircularProgress
              sx={{
                '--CircularProgress-progressColor': '#bf8f1f',
                '--CircularProgress-trackColor': '#c1c4c9',
                '--CircularProgress-progressThickness': '5px',
              }}
              color='warning'
              size='md'
              determinate
              value={
                (nutritionLog.total_carbs / Math.round((user.bmr * 0.35) / 4)) *
                100
              }
              max={Math.round((user.bmr * 0.35) / 4)}
            ></CircularProgress>
          </Card>
        </Grid>
      )}
      {nutritionLog.total_fats && (
        <Grid
          xs={4}
          sx={{ display: 'flex' }}
        >
          <Card
            sx={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
              bgcolor: 'inherit',
              boxShadow: '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
            }}
          >
            <Typography level='title-md'>Fats</Typography>
            <Typography level='body-sm'>
              {nutritionLog.total_fats} / {Math.round((user.bmr * 0.3) / 9)}g
            </Typography>
            <CircularProgress
              color='danger'
              sx={{
                '--CircularProgress-progressColor': '#6239b3',
                '--CircularProgress-trackColor': '#c1c4c9',
                '--CircularProgress-progressThickness': '5px',
              }}
              size='md'
              determinate
              value={
                (nutritionLog.total_fats / Math.round((user.bmr * 0.3) / 9)) *
                100
              }
              max={Math.round((user.bmr * 0.3) / 9)}
            ></CircularProgress>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
