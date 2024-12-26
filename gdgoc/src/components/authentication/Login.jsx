import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { googleSignIn, githubSignIn } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const history = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      toast.success("logged in")
      history("/");
    } catch (err) {
      console.log(err);
      toast.error("Failed to login")
    }
    setLoading(false);
  };

  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      await githubSignIn();
      toast.success("logged in")
      history.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Failed to login")
    }
    setLoading(false);
  };

  return (
  
      <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignContent="center"
    >
      <Box
        display="flex"
        width={["100vw", null, null, "40vw"]}
        height="100vh"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexDirection="column"
      >
        <Box width="90%" maxW="400px" boxShadow="lg" px={6} py={8} rounded="lg">
          <Text fontSize="2xl" fontWeight="semibold" mb={4}>
            Login
          </Text>
          <Button
            width="100%"
            mt={4}
            py={6}
            colorScheme="blue"
            onClick={handleGoogleSignIn}
            isLoading={loading}
          >
            Sign in with Google
          </Button>
          <Button
            width="100%"
            mt={4}
            py={6}
            colorScheme="gray"
            onClick={handleGithubSignIn}
            isLoading={loading}
          >
            Sign in with GitHub
          </Button>
        </Box>
        <Text mt={8} fontWeight="normal" fontSize="lg">
          Don't have an account?{" "}
          <Link to="/signup">
            <ChakraLink color="blue.400">Sign up</ChakraLink>
          </Link>
        </Text>
      </Box>
      <Box
        width={["0vw", null, null, "60vw"]}
        height="100%"
        bgGradient="linear(to-br, blue.500, blue.400)"
        boxShadow="2xl"
      ></Box>
    </Box>
  
    
  );
}

export default Login;
