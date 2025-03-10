import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Button, Textarea, TextInput, Paper } from '@mantine/core';
import axios from 'axios';

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 2rem;
  height: calc(100vh - 60px);
`;

const Editor = styled(Paper)`
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
`;

const AIPanel = styled(Paper)`
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
`;

const ScriptEditor = () => {
  const [script, setScript] = useState('');
  const [title, setTitle] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  const generateWithAI = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/ai/generate', {
        prompt: script
      });
      setAiSuggestions(response.data.suggestion);
    } catch (error) {
      console.error('AI generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveScript = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/scripts', {
        title,
        content: script
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  return (
    <EditorContainer>
      <Editor shadow="md">
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Script Title"
          mb="md"
        />
        <Textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Start writing your script..."
          minRows={20}
          styles={{ input: { fontFamily: 'monospace' } }}
        />
        <Button onClick={saveScript} mt="md">
          Save Script
        </Button>
      </Editor>

      <AIPanel shadow="md">
        <Button 
          onClick={generateWithAI}
          loading={loading}
          fullWidth
          mb="md"
        >
          Generate Suggestions
        </Button>
        <Textarea
          value={aiSuggestions}
          readOnly
          minRows={10}
          placeholder="AI suggestions will appear here..."
        />
      </AIPanel>
    </EditorContainer>
  );
};

export default ScriptEditor;