import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../hooks/useShowToast";

const SuggestedUsers = () => {
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setSuggestedUsers(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getSuggestedUsers();
  }, [showToast]);

  // Filter users based on the search term
  const filteredUsers = suggestedUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Text mb={4} fontWeight="bold">
        Suggested Users
      </Text>
      {/* Search Bar */}
      <Input
        placeholder="Search users..."
        mb={4}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Flex direction="column" gap={4}>
        {!loading &&
          filteredUsers.map((user) => (
            <SuggestedUser key={user._id} user={user} />
          ))}
        {loading &&
          [0, 1, 2, 3, 4].map((_, idx) => (
            <Flex key={idx} gap={2} alignItems="center" p="1" borderRadius="md">
              {/* avatar skeleton */}
              <Box>
                <SkeletonCircle size="10" />
              </Box>
              {/* username and fullname skeleton */}
              <Flex w="full" flexDirection="column" gap={2}>
                <Skeleton h="8px" w="80px" />
                <Skeleton h="8px" w="90px" />
              </Flex>
              {/* follow button skeleton */}
              <Flex>
                <Skeleton h="20px" w="60px" />
              </Flex>
            </Flex>
          ))}
      </Flex>
    </>
  );
};

export default SuggestedUsers;
