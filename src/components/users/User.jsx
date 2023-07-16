import React from 'react';
import { Button, Code, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PROTECTED } from '../../lib/routes';
import Avatar from '../profile/Avatar';

/**
 * Component for rendering a user card.
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object to render.
 * @returns {JSX.Element} - The rendered component.
 */
export default function User({ user }) {
  const { id, username } = user; // Destructuring the user object to extract the necessary properties

  return (
    <VStack
      bg="gray.100"
      shadow="sm"
      rounded="md"
      textAlign="center"
      p="4"
      spacing="3"
    >
      {/* Render the Avatar component with the user object */}
      <Avatar user={user} />

      <Code>@{username}</Code> {/* Render the username using the Code component */}
      
      <Link>
        {/* Render a Button component as a Link to view the user's profile */}
        <Button
          as={Link}
          to={`${PROTECTED}/profile/${id}`} // Generate the profile link based on the user's ID
          size="sm"
          variant="link"
          colorScheme="teal"
        >
          View Profile
        </Button>
      </Link>
    </VStack>
  );
}
