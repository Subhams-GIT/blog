import { IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/color-mode";
function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <IconButton
        onClick={toggleColorMode}
        
        variant={[null]}
      >
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </header>
  );
}

export default ToggleTheme;
