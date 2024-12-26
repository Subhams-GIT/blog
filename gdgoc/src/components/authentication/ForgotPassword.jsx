import React, { useState } from "react";
import {
  Container,
  Box,
  Flex,
  Button,
  Text,
  Input,
  SimpleGrid,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";

// Context
import { useAuth } from "../../contexts/AuthContext";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(email);

      toast.success("Check your inbox for password reset instructions")
    } catch (err) {
      console.log(err);
      setError(err.message);

      toast.error("Failed to reset password")
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
            Reset Password
          </Text>

          <FormControl id="email" mt={4} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              variant="filled"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Button
            width="100%"
            mt={4}
            py={6}
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Reset password
          </Button>

          <Text mt={6} fontWeight="normal" fontSize="lg">
            <Link to="/login">
              <ChakraLink color="blue.400">Login</ChakraLink>
            </Link>
          </Text>
        </Box>
        <Text mt={6} fontWeight="normal" fontSize="lg">
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

export default ForgotPassword;
