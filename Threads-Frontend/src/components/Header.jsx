import { Button, Flex, Text, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { GiPlantWatering } from "react-icons/gi";
import { MdInfoOutline } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi"; // Uncommented import

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mt={3}
      mb="4"
      borderBottom={`1px solid ${colorMode === "dark" ? "#fff" : "#000"}`}
    >
      <Text
        ml={10}
        fontSize="3xl"
        fontWeight="bold"
        cursor="pointer"
        onClick={toggleColorMode}
      >
        KrishiCare
      </Text>
      {!user && (
        <Link as={RouterLink} to="/auth" onClick={() => setAuthScreen("login")}>
          Login
        </Link>
      )}

      {user && (
        <Flex alignItems="center" gap={4}>
          <Link as={RouterLink} to="/">
            <AiFillHome size={24} />
          </Link>
          <Link as={RouterLink} to="/about">
            <MdInfoOutline size={20} />
          </Link>
          <Link as={RouterLink} to="/weather">
            <WiDaySunny size={24} />
          </Link>
          <Link as={RouterLink} to="/disease">
            <GiPlantWatering size={24} />
          </Link>
          <Link as={RouterLink} to="/chat">
            <BsFillChatQuoteFill size={20} />
          </Link>
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to="/settings">
            <MdOutlineSettings size={20} />
          </Link>
          <Button size="xs" onClick={logout} mr={10}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to="/auth"
          onClick={() => setAuthScreen("signup")}
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
