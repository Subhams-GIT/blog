import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Spacer,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { Menu,MenuButton,MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/menu";
import { HamburgerIcon,ArrowDownIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import ToggleTheme from "../../theme/ToggleTheme";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useColorMode } from "@chakra-ui/color-mode";

function Nav() {
  const [width, setWidth] = useState(window.innerWidth);
  
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  
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
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
     toast.error("Failed to logout");
    }
  };



  return (
    <Box py="5" px={["6", "10"]} width="100%">
      <Flex justify="center" align="center">
        <Text as={Link} to="/" fontSize={["2xl", "3xl"]} fontWeight="bold">
          Medium
        </Text>
        <Spacer />
        <ToggleTheme />
        <Box ml="2">
          {currentUser ? (
            <Menu>
              {width > 768 ? (
                <MenuButton as={Button} rightIcon={<ArrowDownIcon />}>
                  My profile
                </MenuButton>
              ) : (
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                  background={"black"}
                  textColor={"white"}
                />
              )}
              <MenuList>
                <MenuGroup>
                  <MenuItem as={Link} to="/write">
                    Write article
                  </MenuItem>
                  <MenuItem as={Link} to="/my-articles">
                    My articles
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title={currentUser?.displayName || "Guest User"}>
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
