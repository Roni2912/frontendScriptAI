import {
  Box,
  Heading,
  Text,
  IconButton,
  VStack,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaTrash, FaExpand, FaCompress } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

const MotionBox = motion(Box);

const ScriptCard = ({ script, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/scripts/${script._id}`, 
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      toast({
        title: 'Script Deleted',
        description: response.data.message || 'The script has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onDelete(script._id);
      onClose();
    } catch (error) {
      console.error('Error deleting script:', error);

      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        'Failed to delete script';

      toast({
        title: 'Delete Failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const FullContentModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{script.title}</ModalHeader>
        <ModalBody>
          <Text whiteSpace="pre-wrap" lineHeight="tall">
            {script.content}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      <MotionBox
        whileHover={{ scale: 1.02 }}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        shadow="md"
        position="relative"
      >
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between" align="center">
            <Heading size="md" flex="1" isTruncated>
              {script.title}
            </Heading>
            
            <HStack spacing={2}>
              <IconButton
                icon={isExpanded ? <FaCompress /> : <FaExpand />}
                variant="ghost"
                colorScheme="blue"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label={isExpanded ? "Compress" : "Expand"}
                size="sm"
              />
              
              <IconButton
                icon={<FaTrash />}
                variant="ghost"
                colorScheme="red"
                onClick={handleDelete}
                aria-label="Delete script"
                size="sm"
              />
            </HStack>
          </HStack>

          <Collapse in={isExpanded} animateOpacity>
            <Text 
              whiteSpace="pre-wrap" 
              lineHeight="tall"
              maxHeight="300px"
              overflowY="auto"
              borderWidth={1}
              borderColor="gray.200"
              p={3}
              borderRadius="md"
            >
              {script.content}
            </Text>
          </Collapse>

          {!isExpanded && (
            <Text 
              noOfLines={4} 
              color="gray.600"
              fontStyle="italic"
              onClick={() => setIsExpanded(true)}
              cursor="pointer"
              _hover={{ color: "blue.500" }}
            >
              {script.content}
            </Text>
          )}

          <Text fontSize="sm" color="gray.500" alignSelf="flex-end">
            Created: {new Date(script.createdAt).toLocaleDateString()}
          </Text>
        </VStack>
      </MotionBox>

      <FullContentModal />
    </>
  );
};

export default ScriptCard;