import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Toast } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { googleSignIn, githubSignIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      toast({
        title: "Account successfully created",
        status: "success",
        duration: 5000,
      });
      history("/");
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to sign up",
        description: err.message,
        status: "error",
        duration: 5000,
      });
    }
    setLoading(false);
  };

  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      await githubSignIn();
      toast({
        title: "Account successfully created",
        status: "success",
        duration: 5000,
      });
      history("/");
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to sign up",
        description: err.message,
        status: "error",
        duration: 5000,
      });
    }
    setLoading(false);
  };

  return (
    <Box
      width="100vw"
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
            Sign Up
          </Text>
          <Button
            width="100%"
            mt={4}
            py={6}
            colorScheme="blue"
            onClick={handleGoogleSignIn}
            isLoading={loading}
          >
            Sign up with Google
          </Button>
          <Button
            width="100%"
            mt={4}
            py={6}
            colorScheme="gray"
            onClick={handleGithubSignIn}
            isLoading={loading}
          >
            Sign up with GitHub
          </Button>
        </Box>
        <Text mt={8} fontWeight="normal" fontSize="lg">
          Already have an account?{" "}
          <Link to="/login">
            <ChakraLink color="blue.400">Login</ChakraLink>
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

export default Signup;
