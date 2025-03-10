import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  IconButton,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin 
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      color={textColor}
      mt="auto"
      py={6}
      borderTop="1px"
      borderColor={borderColor}
    >
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} ScriptAI. All rights reserved
          </Text>
          
          <Stack 
            direction="row" 
            spacing={4} 
            align="center"
          >
            <Link 
              as={RouterLink} 
              to="/dashboard" 
              fontSize="sm"
              _hover={{ color: 'blue.500' }}
            >
              Dashboard
            </Link>
            <Link 
              as={RouterLink} 
              to="/dashboard/projects" 
              fontSize="sm"
              _hover={{ color: 'blue.500' }}
            >
              Projects
            </Link>
            <Link 
              as={RouterLink} 
              to="/dashboard/settings" 
              fontSize="sm"
              _hover={{ color: 'blue.500' }}
            >
              Settings
            </Link>
          </Stack>

          <Stack direction="row" spacing={4}>
            <IconButton
              as="a"
              href="https://github.com/yourusername"
              target="_blank"
              aria-label="GitHub"
              icon={<FaGithub />}
              size="sm"
              variant="ghost"
              color={textColor}
              _hover={{ color: 'blue.500' }}
            />
            <IconButton
              as="a"
              href="https://twitter.com/yourusername"
              target="_blank"
              aria-label="Twitter"
              icon={<FaTwitter />}
              size="sm"
              variant="ghost"
              color={textColor}
              _hover={{ color: 'blue.500' }}
            />
            <IconButton
              as="a"
              href="https://linkedin.com/company/yourusername"
              target="_blank"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              size="sm"
              variant="ghost"
              color={textColor}
              _hover={{ color: 'blue.500' }}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;