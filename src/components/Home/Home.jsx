import { Box } from '@chakra-ui/react';
import Hero from './Hero';
import Features from './Features';
import Pricing from './Pricing';

const Home = () => {
  return (
    <Box>
      <Hero />
      <Features />
      <Pricing />
    </Box>
  );
};

export default Home;