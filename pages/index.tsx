import { NextPage } from 'next';

import { Typography } from '@mui/material';
import { Layout } from '../components/layouts';

const Home: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h1" color="primary">
        Material UI
      </Typography>
    </Layout>
  );
};

export default Home;
