import { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const MotionBox = motion(Box);

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', response.data.token);
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={8}>
          <Heading>Create Account</Heading>
          <Box w="100%" as="form" onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                w="100%"
                isLoading={loading}
              >
                Register
              </Button>
            </VStack>
          </Box>
          <Text>
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="blue.500">
              Login
            </Link>
          </Text>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default Register;