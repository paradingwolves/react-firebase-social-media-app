import React from 'react';
import { Flex, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { DASHBOARD } from '../../lib/routes';
import { useLogout } from '../../hooks/auth';

/**
 * Component for rendering a navigation bar.
 * @returns {JSX.Element} - The rendered component.
 */
const Navbar = () => {
  const { logout, isLoading } = useLogout(); // Fetching the logout function and loading status using the useLogout hook

  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="teal.400"
      height="16"
      zIndex="3"
      justify="center"
      bg="white"
    >
      <Flex px="4" w="full" align="center" maxW="1200px">
        <Link color="teal" as={RouterLink} to={DASHBOARD} fontWeight="bold">
          Home
        </Link>
        <Button
          ml="auto"
          colorScheme="teal"
          size="sm"
          onClick={logout} // Triggering the logout function when the button is clicked
          isLoading={isLoading} // Displaying a loading state for the button if it is currently logging out
        >
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
