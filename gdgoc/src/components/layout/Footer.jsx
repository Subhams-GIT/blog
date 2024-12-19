import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";
function Footer() {
  return (
    <Box w="100%" d="flex" justifyContent="center" alignItems="center" mb="10">
      <IconButton
        onClick={() =>
          window.open("https://github.com/manishyoudumb", "_blank")
        }
        variant="ghost"
        size="lg"
        icon={<FiGithub />}
      />
    </Box>
  );
}

export default Footer;
