import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import {
  Box,
  Flex,
  Text,
  VStack,
  useColorMode,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
} from "@chakra-ui/react";
import { FiLink } from "react-icons/fi";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import UpdateProfilePage from "../pages/UpdateProfilePage";

const UserHeader = ({ user }) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); // logged in user
  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isFollowingModal, setIsFollowingModal] = React.useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Success.",
        status: "success",
        description: "Profile link copied.",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const openFollowersModal = () => {
    setIsFollowingModal(false); // Show followers
    setIsModalOpen(true); // Open the modal
  };

  const openFollowingModal = () => {
    setIsFollowingModal(true); // Show following
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true); // Open profile update modal
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false); // Close profile modal
  };

  return (
    <Box
      maxW="900px"
      w="full"
      mx="auto"
      px={4}
      color={colorMode === "dark" ? "white" : "gray.800"}
      borderRadius="lg"
    >
      <VStack gap={6} alignItems={"start"} w="full">
        <Flex justifyContent={"space-between"} w={"full"} alignItems="center">
          <Box>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              {user.name}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text
                fontSize={"md"}
                color={colorMode === "dark" ? "gray.400" : "gray.600"}
              >
                @{user.username}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Avatar
              name={user.name}
              src={user.profilePic || "https://bit.ly/broken-link"}
              size={"xl"}
              boxShadow="lg"
              border="2px solid #fff"
            />
          </Box>
        </Flex>

        <Text fontSize="md" lineHeight={1.6}>
          {user.bio}
        </Text>

        <Flex
          w="full"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          {currentUser?._id === user._id ? (
            <>
              <Button
                size={"sm"}
                colorScheme="blue"
                variant="outline"
                onClick={openProfileModal}
              >
                Update Profile
              </Button>
              <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal}>
                <ModalOverlay />
                <ModalContent maxW="900px" border="none">
                  <ModalHeader>Update Profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <UpdateProfilePage />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" onClick={closeProfileModal}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          ) : (
            <Button
              size={"sm"}
              onClick={handleFollowUnfollow}
              isLoading={updating}
              colorScheme="blue"
              variant="solid"
              w="full"
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
          )}

          <IconButton
            aria-label="Copy Profile Link"
            icon={<FiLink />}
            colorScheme="teal"
            variant="outline"
            onClick={copyURL}
          />
        </Flex>

        <Flex
          w={"full"}
          justifyContent={"space-between"}
          alignItems="center"
          mt={1}
          gap={10}
        >
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={openFollowersModal}
            w="full"
          >
            {user.followers.length} Followers
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={openFollowingModal}
            w="full"
          >
            {user.following.length} Following
          </Button>
        </Flex>

        <Text fontSize="xl" fontWeight="bold" mt={6}>
          Posts
        </Text>

        {/* Followers and Following Modals */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {isFollowingModal ? "Following" : "Followers"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {(isFollowingModal ? user.following : user.followers).map(
                (person) => (
                  <Flex key={person._id} alignItems="center" mb={2}>
                    <Avatar
                      size="sm"
                      name={person.name}
                      src={person.profilePic}
                    />
                    <Text ml={2}>{person.name}</Text>
                  </Flex>
                )
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default UserHeader;
