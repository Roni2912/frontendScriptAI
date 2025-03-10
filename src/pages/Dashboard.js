import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import axios from 'axios';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ScriptGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Dashboard = () => {
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/scripts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setScripts(response.data);
      } catch (error) {
        console.error('Error fetching scripts:', error);
      }
    };

    fetchScripts();
  }, []);

  return (
    <DashboardContainer>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        My Scripts
      </motion.h1>
      <ScriptGrid>
        {scripts.map((script) => (
          <motion.div
            key={script._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
          </motion.div>
        ))}
      </ScriptGrid>
    </DashboardContainer>
  );
};

export default Dashboard;