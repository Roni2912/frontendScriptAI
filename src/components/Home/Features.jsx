// src/components/home/Features.jsx
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import { FaMagic, FaHistory, FaCloud, FaBolt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Feature = ({ icon, title, text }) => {
  const { colorMode } = useColorMode();
  
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      p={6}
      borderRadius="lg"
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      shadow="xl"
      border="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
    >
      <VStack spacing={4}>
        <Icon as={icon} w={10} h={10} color="blue.500" />
        <Text fontWeight="bold" fontSize="xl">
          {title}
        </Text>
        <Text color="gray.500" textAlign="center">
          {text}
        </Text>
      </VStack>
    </MotionBox>
  );
};

const Features = () => {
  return (
    <Box py={20} bg="gray.50">
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
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
                Powerful Features
              </Heading>
           </MotionBox>
            <Text fontSize="lg" color="gray.500">
              Everything you need to create amazing scripts
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <Feature
              icon={FaMagic}
              title="AI Generation"
              text="Generate creative scripts using advanced AI technology"
            />
            <Feature
              icon={FaHistory}
              title="Version History"
              text="Keep track of all your script versions"
            />
            <Feature
              icon={FaCloud}
              title="Cloud Storage"
              text="Store and access your scripts from anywhere"
            />
            <Feature
              icon={FaBolt}
              title="Fast Processing"
              text="Get your scripts generated in seconds"
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Features;