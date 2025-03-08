import {
  Button,
  Box,
  Text,
  Flex,
  Divider,
  useColorMode,
  VStack,
  Heading,
} from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

const SettingsPage = () => {
  const showToast = useShowToast();
  const logout = useLogout();
  const { colorMode } = useColorMode();

  const freezeAccount = async () => {
    if (!window.confirm("Are you sure you want to freeze your account?"))
      return;

    try {
      const res = await fetch("/api/users/freeze", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      if (data.success) {
        await logout();
        showToast("Success", "Your account has been frozen", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Box>
      <Flex justify="center" mt={10} px={4}>
        <VStack
          spacing={5}
          w={{ base: "90%", md: "50%" }}
          p={6}
          borderRadius="lg"
          bg={colorMode === "dark" ? "gray.800" : "gray.100"}
          boxShadow="md"
        >
          <Heading fontSize="2xl">Settings</Heading>
          <Divider />

          {/* Freeze Account Section */}
          <Box w="100%">
            <Text fontWeight="bold">Freeze Your Account</Text>
            <Text fontSize="sm" color="gray.500">
              You can unfreeze your account anytime by logging in.
            </Text>
            <Button
              mt={3}
              size="md"
              colorScheme="red"
              w="full"
              onClick={freezeAccount}
            >
              Freeze Account
            </Button>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default SettingsPage;
