import { createSystem, defaultConfig } from "@chakra-ui/react"
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors:{
        bg: {
          DEFAULT: { value: "{colors.gray.100}" },
          primary: { value: "{colors.teal.100}" },
          secondary: { value: "{colors.gray.100}" },
        },
      }
    },
  },
})


