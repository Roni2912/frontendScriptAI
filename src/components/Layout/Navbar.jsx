import React from 'react';
import {
  Box,
  Flex,
  Button,
  Stack,
  Link,
  useColorMode,
  IconButton,
  useDisclosure,
  Container,
  Avatar,
  HStack,
  Text,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { 
  FaBars, 
  FaTimes, 
  FaMoon, 
  FaSun, 
  FaHome, 
  FaUserCircle, 
  FaSignOutAlt,
  FaDashcube 
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = colorMode === 'light' ? 'white' : 'black.800';
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700';

  return (
    <Box
      bg={bgColor}
      px={4}
      position="sticky"
      top={0}
      zIndex={100}
      boxShadow="sm"
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">

          <IconButton
            display={{ md: 'none' }}
            onClick={onOpen}
            variant="ghost"
            icon={<FaBars />}
            aria-label="Open Menu"
          />

          <Link
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            bgGradient="linear(to-r, blue.500, blue.700)"
            bgClip="text"
            _hover={{ textDecoration: 'none' }}
          >
            ScriptAI
          </Link>

          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Button
              as={RouterLink}
              to="/"
              variant="ghost"
              leftIcon={<FaHome />}
            >
              Home
            </Button>
            {user && (
              <Button
                as={RouterLink}
                to="/dashboard"
                variant="ghost"
                leftIcon={<FaDashcube />}
              >
                Dashboard
              </Button>
            )}
          </HStack>

          <HStack spacing={4}>
            <IconButton
              onClick={toggleColorMode}
              variant="ghost"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              aria-label="Toggle Color Mode"
            />

            {user ? (
              <HStack spacing={3}>
                <Avatar 
                  size="sm" 
                  name={user.name} 
                  src={user.avatar} 
                />
                <Button 
                  onClick={logout} 
                  variant="ghost" 
                  colorScheme="red"
                  leftIcon={<FaSignOutAlt />}
                  display={{ base: 'none', md: 'flex' }}
                >
                  Logout
                </Button>
              </HStack>
            ) : (
              <HStack>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="ghost"
                >
                  Login
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  colorScheme="blue"
                >
                  Sign Up
                </Button>
              </HStack>
            )}
          </HStack>
        </Flex>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              <Text 
                bgGradient="linear(to-r, blue.500, blue.700)"
                bgClip="text"
                fontWeight="bold"
              >
                ScriptAI Menu
              </Text>
            </DrawerHeader>

            <DrawerBody>
              <VStack align="stretch" spacing={4}>
                <Button
                  as={RouterLink}
                  to="/"
                  leftIcon={<FaHome />}
                  variant="ghost"
                  onClick={onClose}
                >
                  Home
                </Button>

                {user ? (
                  <>
                    <Button
                      as={RouterLink}
                      to="/dashboard"
                      leftIcon={<FaDashcube />}
                      variant="ghost"
                      onClick={onClose}
                    >
                      Dashboard
                    </Button>
                    <Button
                      leftIcon={<FaSignOutAlt />}
                      colorScheme="red"
                      variant="outline"
                      onClick={() => {
                        logout();
                        onClose();
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      as={RouterLink}
                      to="/login"
                      variant="ghost"
                      onClick={onClose}
                    >
                      Login
                    </Button>
                    <Button
                      as={RouterLink}
                      to="/register"
                      colorScheme="blue"
                      onClick={onClose}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Container>
    </Box>
  );
};

export default Navbar;