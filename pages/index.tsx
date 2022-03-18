import { NextPage } from 'next';

import { Card, CardHeader, Grid, Typography } from '@mui/material';

import { Layout } from '../components/layouts';
import { EntryList } from '../components/ui';

const Home: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h1" color="primary">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardHeader title="pendientes" />
              <EntryList />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardHeader title="En progreso" />
              <EntryList />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardHeader title="Completadas" />
              <EntryList />
            </Card>
          </Grid>
        </Grid>
      </Typography>
    </Layout>
  );
};

export default Home;
