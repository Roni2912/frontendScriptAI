import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components//Layout/Footer';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Box minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex="1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard/*"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;