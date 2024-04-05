import React, { useEffect } from 'react';
import PieChart from './picchart';
import { Card, Container, CssBaseline, Grid } from '@mui/material';
import Barchart from './barchat';

function Dashboard() {
  useEffect(() => {
    const getToken = async () => {
      const accessToken = await localStorage.getItem('accessToken');
      console.log(accessToken);
    };
    getToken();
  }, []);

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <PieChart />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <Barchart />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
