import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const LoadingSmall = () => {
  return (
    <Box display="flex" justifyContent="center" alignContent="center" width="100%" height={"100%"}>
      <Spinner margin="10" color="blue.500" />
    </Box>
  );
};

export default LoadingSmall;
