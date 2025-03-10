// src/components/home/Pricing.jsx
import {
    Box,
    Button,
    Container,
    Heading,
    List,
    ListItem,
    ListIcon,
    SimpleGrid,
    Text,
    VStack,
    useColorMode,
  } from '@chakra-ui/react';
  import { FaCheckCircle } from 'react-icons/fa';
  import { motion } from 'framer-motion';
  
  const MotionBox = motion(Box);
  
  const PriceCard = ({ title, price, features, isPrimary }) => {
    const { colorMode } = useColorMode();
  
    return (
      <MotionBox
        whileHover={{ y: -5 }}
        p={6}
        borderRadius="lg"
        bg={isPrimary ? 'blue.500' : colorMode === 'light' ? 'white' : 'gray.700'}
        color={isPrimary ? 'white' : 'inherit'}
        shadow="xl"
        border="1px"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
      >
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="4xl" fontWeight="bold">
            {price}
          </Text>
          <List spacing={3} w="full">
            {features.map((feature, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <ListIcon
                  as={FaCheckCircle}
                  color={isPrimary ? 'white' : 'blue.500'}
                  mr={2}
                />
                {feature}
              </ListItem>
            ))}
          </List>
          <Button
            w="full"
            colorScheme={isPrimary ? 'white' : 'blue'}
            variant={isPrimary ? 'outline' : 'solid'}
            size="lg"
          >
            Get Started
          </Button>
        </VStack>
      </MotionBox>
    );
  };
  
  const Pricing = () => {
    return (
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" size="2xl">
                Simple, Transparent Pricing
              </Heading>
              <Text fontSize="lg" color="gray.500">
                Choose the plan that best fits your needs
              </Text>
            </VStack>
  
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={10}
              w="full"
              px={{ base: 4, md: 0 }}
            >
              <PriceCard
                title="Free"
                price="$0"
                features={[
                  '5 scripts per month',
                  'Basic AI generation',
                  'Community support',
                  'Basic templates'
                ]}
              />
              <PriceCard
                title="Pro"
                price="$29"
                features={[
                  'Unlimited scripts',
                  'Advanced AI features',
                  'Priority support',
                  'Premium templates'
                ]}
                isPrimary
              />
              <PriceCard
                title="Enterprise"
                price="Custom"
                features={[
                  'Custom solutions',
                  'API access',
                  'Dedicated support',
                  'Custom templates'
                ]}
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    );
  };
  
  export default Pricing;