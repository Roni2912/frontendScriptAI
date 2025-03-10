import { motion } from 'framer-motion';
import styled from 'styled-components';

const HomePage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  color: white;
`;

const Hero = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 4rem auto;
`;

const Home = () => {
  return (
    <HomePage>
      <Hero>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Bring your film project to life
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          From idea to production with AI-powered scriptwriting
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Creating
        </motion.button>
      </Hero>
    </HomePage>
  );
};

export default Home;