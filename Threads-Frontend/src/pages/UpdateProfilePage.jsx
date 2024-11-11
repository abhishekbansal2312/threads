import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";

export default function UpdateProfilePage({ onClose }) {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: "",
  });
  const fileRef = useRef(null);
  const [updating, setUpdating] = useState(false);

  const showToast = useShowToast();

  const { handleImageChange, imgUrl } = usePreviewImg();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });
      const data = await res.json(); // updated user object
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Profile updated successfully", "success");

      // Update form inputs with the newly updated user data
      setInputs({
        name: data.name,
        username: data.username,
        email: data.email,
        bio: data.bio,
        password: "", // Clear the password field
      });

      setUser(data);
      localStorage.setItem("user-profile", JSON.stringify(data));

      // Redirect to updated user's profile page using the updated username
      window.location.replace(`/${data.username}`);

      onClose(); // Close the form after successful update
    } catch (error) {
      showToast("Error", error.message || error, "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex align={"center"} justify={"center"} my={6}>
        <Stack
          spacing={4}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          rounded={"xl"}
          p={6}
        >
          <FormControl id="userName" border="none">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  boxShadow={"md"}
                  src={imgUrl || user.profilePic}
                  border="none"
                />
              </Center>
              <Center w="full">
                <Button
                  w="full"
                  onClick={() => fileRef.current.click()}
                  colorScheme="blue"
                >
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                  border="none"
                />
              </Center>
            </Stack>
          </FormControl>

          <FormControl border="none">
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="John Doe"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              _placeholder={{ color: "gray.500" }}
              type="text"
              border="none"
            />
          </FormControl>

          <FormControl border="none">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="johndoe"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              _placeholder={{ color: "gray.500" }}
              type="text"
              border="none"
            />
          </FormControl>

          <FormControl border="none">
            <FormLabel>Email Address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              _placeholder={{ color: "gray.500" }}
              type="email"
              border="none"
            />
          </FormControl>

          <FormControl border="none">
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="A brief bio about yourself."
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              _placeholder={{ color: "gray.500" }}
              type="text"
              border="none"
            />
          </FormControl>

          <FormControl border="none">
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="New password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              _placeholder={{ color: "gray.500" }}
              type="password"
              border="none"
            />
          </FormControl>

          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
              isLoading={updating}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
