import React, { useEffect } from 'react';
import PieChart from './picchart';
import { Card, Container, CssBaseline, Grid } from '@mui/material';
import Linechart from './linechart';
import Barchart from './barchat';
function Dashboard() {
  useEffect(() => {
    const getTocken = async () => {
      const access_token = await localStorage.getItem('accessToken');
      console.log(access_token);
    };
    getTocken();
  }, []);
  return (
    <>
      <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
        <CssBaseline />
        <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
          <Grid item md={3.5}>
            <Card>
              <Linechart />
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
              <PieChart />
            </Card>
          </Grid>
          <Grid item md={3.5}>
            <Card>
              <Barchart />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Dashboard;
