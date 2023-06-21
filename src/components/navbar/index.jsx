import React from 'react';
import { Flex, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink} from 'react-router-dom';
import { DASHBOARD } from '../../lib/routes';
import { useLogout } from '../../hooks/auth';

const Navbar = () => {
  const {logout, isLoading} = useLogout();
  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="teal.400"
      height="16"
      zIndex="0"
      justify="center"
    >
      <Flex px="4" w="full" align="center" maxW="1200px" >
        <Link color="teal" as={RouterLink} to={DASHBOARD} fontWeight="bold">
          Home
        </Link>
        <Button 
          ml="auto" 
          colorScheme="teal" 
          size="sm"
          onClick={logout}
          isLoading={isLoading}
        >
          Log Out
        </Button>
      </Flex>
    </Flex>
  )
}

export default Navbar
