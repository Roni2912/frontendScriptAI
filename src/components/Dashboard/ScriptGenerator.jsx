import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { aiAPI, scriptsAPI } from "../../services/api";

const MotionBox = motion(Box);

const ScriptGenerator = ({ onScriptGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!prompt.trim()) {
        setError('Please enter a prompt');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      /** TODO: IF NEED */
      // const response = await  aiAPI.generate(
      //   { prompt },
      //   {
      //     headers: { 
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json'
      //     },
      //     timeout: 40000
      //   }
      // )

      const response = await aiAPI.generate(prompt);

      const generatedScript = response.data.generated_script;
      if (!generatedScript) {
        throw new Error('No script was generated');
      }
 
      await scriptsAPI.create(
        {
          title: prompt.slice(0, 50),
          content: generatedScript,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      

      setPrompt('');
      onScriptGenerated();
      
      toast({
        title: 'Script Generated',
        description: 'Your script was successfully created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        'Failed to generate script';

      setError(errorMessage);

      toast({
        title: 'Generation Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      maxWidth="800px"
      margin="0 auto"
      padding={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <VStack spacing={4} width="full">
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormControl isInvalid={!!error}>
          <FormLabel fontWeight="bold">
            What kind of script do you want to generate?
          </FormLabel>
          <Textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setError(null);
            }}
            placeholder="Describe the script you want to create. Be specific about the genre, tone, and key elements."
            size="lg"
            minH="200px"
            resize="vertical"
            borderColor="gray.300"
            _hover={{ borderColor: 'blue.500' }}
            focusBorderColor="blue.500"
          />
        </FormControl>

        <Button
          colorScheme="blue"
          isLoading={loading}
          loadingText="Generating Script..."
          onClick={handleGenerate}
          isDisabled={!prompt.trim() || loading}
          width="full"
          size="lg"
          boxShadow="md"
          _hover={{ 
            transform: 'translateY(-2px)',
            boxShadow: 'lg'
          }}
          transition="all 0.2s"
        >
          Generate Script
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default ScriptGenerator;