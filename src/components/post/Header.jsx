import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Avatar from '../profile/Avatar';
import { useUser } from '../../hooks/users';

const Header = ({uid}) => {
    const {user, isLoading} = useUser(uid);
    if (isLoading) return "Loading...";
  return (
    <Flex
        alignITems="center"
        borderBottom="2px solid"
        borderColor="teal.100"
        p="3"
        bg="gray.50"
    >
        <Avatar user={user} size="md"/>

        <Box ml="4">
            <Button 
                colorScheme='teal'
                variant="link"
            >
                @{user.username}
            </Button>
            <Text fontSize="sm" color="gray.500">
                2h ago
            </Text>
        </Box>

    </Flex>
  )
}

export default Header;
