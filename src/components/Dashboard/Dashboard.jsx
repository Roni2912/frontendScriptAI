import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Flex,
  Spacer,
  useToast,
  Icon,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaRocket, 
  FaClipboardList 
} from 'react-icons/fa';
import ScriptGenerator from './ScriptGenerator';
import ScriptCard from './ScriptCard';
import axios from 'axios';

const MotionBox = motion(Box);

const Dashboard = () => {
  const [scripts, setScripts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // const handleDeleteScript = (deletedScriptId) => {
  //   setScripts(prevScripts => 
  //     prevScripts.filter(script => script._id !== deletedScriptId)
  //   );
  // };

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/scripts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setScripts(response.data);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Error fetching scripts',
        status: 'error',
        duration: 3000,
      });
      setIsLoading(false);
    }
  };

  return (
    <Box bg={bgColor} minHeight="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={10} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Flex alignItems="center" mb={8}>
              <VStack align="start" spacing={1}>
                <Heading 
                  size="xl"
                  bgGradient="linear(to-r, blue.500, blue.700)"
                  bgClip="text"
                  fontWeight="bold"
                >
                  Script Dashboard
                </Heading>
                <Text color={textColor}>
                  Manage and generate your creative scripts
                </Text>
              </VStack>
              <Spacer />
              <HStack>
                <Button 
                  leftIcon={<FaPlus />}
                  colorScheme="blue" 
                  variant="solid"
                >
                  New Project
                </Button>
              </HStack>
            </Flex>
          </MotionBox>

          <Box 
            bg={cardBg} 
            borderRadius="xl" 
            boxShadow="md" 
            p={6}
          >
            <ScriptGenerator onScriptGenerated={fetchScripts} />
          </Box>

          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              <Flex 
                justifyContent="center" 
                alignItems="center" 
                height="300px"
              >
                <VStack>
                  <Icon as={FaRocket} w={12} h={12} color="blue.500" />
                  <Text>Loading your scripts...</Text>
                </VStack>
              </Flex>
            ) : scripts.length > 0 ? (
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={6}
                w="100%"
              >
                {scripts.map((script) => (
                  <MotionBox 
                    key={script._id}
                    variants={itemVariants}
                  >
                    <ScriptCard
                      script={script}
                      onDelete={fetchScripts}
                    />
                  </MotionBox>
                ))}
              </Grid>
            ) : (
              <Flex 
                bg={cardBg} 
                borderRadius="xl" 
                boxShadow="md"
                height="300px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                p={6}
              >
                <Icon 
                  as={FaClipboardList} 
                  w={12} 
                  h={12} 
                  color="blue.500" 
                  mb={4}
                />
                <Heading size="md" mb={2}>
                  No Scripts Yet
                </Heading>
                <Text color={textColor} mb={4}>
                  Start your creative journey by generating your first script
                </Text>
                <Button 
                  colorScheme="blue" 
                  leftIcon={<FaPlus />}
                >
                  Generate First Script
                </Button>
              </Flex>
            )}
          </MotionBox>

          <HStack 
            bg={cardBg} 
            borderRadius="xl" 
            boxShadow="md" 
            p={6} 
            spacing={6} 
            justifyContent="space-between"
          >
            <VStack align="start">
              <Text fontWeight="bold" color={textColor}>
                Total Scripts
              </Text>
              <Badge colorScheme="blue" fontSize="lg">
                {scripts.length}
              </Badge>
            </VStack>
            <VStack align="start">
              <Text fontWeight="bold" color={textColor}>
                Recent Activity
              </Text>
              <Badge colorScheme="green">
                {scripts.length > 0 
                  ? `Last script: ${new Date(scripts[0].createdAt).toLocaleDateString()}` 
                  : 'No recent activity'}
              </Badge>
            </VStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Dashboard;