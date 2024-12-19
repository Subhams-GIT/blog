import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Spacer,
  Menu,
  MenuItem,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { MenuButton,MenuGroup,MenuDivider,MenuList } from "@chakra-ui/menu";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
import ToggleTheme from "../../theme/ToggleTheme";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Nav() {
  const [width, setWidth] = useState(window.innerWidth);
  const toast = useToast();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Failed to logout",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Debugging: Safe logging of currentUser
  console.log(currentUser?.displayName || "No user logged in");

  return (
    <Box py="10" px={["6", "10"]} w="100%">
      <Flex justify="center">
        <Text as={Link} to="/" fontSize={["3xl", "4xl"]} fontWeight="semibold">
          Medium
        </Text>
        <Spacer />
        <ToggleTheme />
        <Box ml="2">
          {currentUser ? (
            <Menu>
              {width > 768 ? (
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  My profile
                </MenuButton>
              ) : (
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                />
              )}
              <MenuList>
                <MenuGroup title="Actions">
                  <MenuItem as={Link} to="/write">
                    Write article
                  </MenuItem>
                  <MenuItem as={Link} to="/my-articles">
                    My articles
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup
                  title={currentUser?.displayName || "Guest User"}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          ) : (
            <Button as={Link} to="/login" colorScheme="blue">
              Sign Up
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default Nav;
