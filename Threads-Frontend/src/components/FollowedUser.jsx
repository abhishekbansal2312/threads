// src/components/FollowedUser.jsx
import { Avatar, Box, Text, Flex } from "@chakra-ui/react";

const FollowedUser = ({ user, onSelect }) => (
  <Flex
    alignItems="center"
    gap={3}
    p={2}
    borderRadius="md"
    _hover={{ bg: "gray.100", cursor: "pointer" }}
    onClick={() => onSelect(user)}
  >
    <Avatar size="sm" src={user.profilePic} name={user.username} />
    <Text>{user.username}</Text>
  </Flex>
);

export default FollowedUser;
