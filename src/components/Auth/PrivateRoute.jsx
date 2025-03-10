import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Spinner, Center } from '@chakra-ui/react';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;