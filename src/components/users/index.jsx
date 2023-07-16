import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useUsers } from '../../hooks/users';
import User from './User';

/**
 * Component for rendering a list of users.
 * @returns {JSX.Element} - The rendered component.
 */
export default function Users() {
  const { users, isLoading } = useUsers(); // Fetching the users and loading status using the useUsers hook

  if (isLoading) return "Loading..."; // Display "Loading..." if the users data is still loading

  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
      {/* Render a SimpleGrid with dynamic column count and spacing */}
      {users?.map((user) => (
        <User key={user.id} user={user} /> // Render the User component for each user
      ))}
    </SimpleGrid>
  );
}
