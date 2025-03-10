import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Box, Button, List, ListItem, ListIcon, VStack, Text, SimpleGrid } from '@chakra-ui/react';

const MotionBox = motion(Box);

const PriceCard = ({ title, price, features, isPrimary }) => {
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      p={6}
      borderRadius="lg"
      bg={isPrimary ? 'blue.500' : 'white'}
      color={isPrimary ? 'white' : 'inherit'}
      shadow="lg"
    >
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="4xl" fontWeight="bold">
          {price}
        </Text>
        <List spacing={3}>
          {features.map((feature, index) => (
            <ListItem key={index}>
              <ListIcon as={FaCheckCircle} color={isPrimary ? 'white' : 'blue.500'} />
              {feature}
            </ListItem>
          ))}
        </List>
        <Button
          colorScheme={isPrimary ? 'white' : 'blue'}
          variant={isPrimary ? 'outline' : 'solid'}
          size="lg"
          w="full"
        >
          Get Started
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default PriceCard;