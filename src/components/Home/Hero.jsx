import { Box, Container, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.xl" py={20}>
      <Stack spacing={8} alignItems="center" textAlign="center">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            Create Amazing Scripts with AI
          </Heading>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Text fontSize="xl" color="gray.600">
            Transform your ideas into compelling scripts using the power of AI
          </Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            colorScheme="blue"
            onClick={() => navigate('/dashboard')}
          >
            Get Started
          </Button>
        </MotionBox>
      </Stack>
    </Container>
  );
};

export default Hero;