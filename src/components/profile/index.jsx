import React, { useEffect, useState } from 'react';
import { Button, Divider, Flex, HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";
import PostsList from '../post/PostList';
import { usePosts } from '../../hooks/posts';
import { useUser } from '../../hooks/users';
import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { format } from 'date-fns';
import EditProfile from './EditProfile';
import { useAuth } from '../../hooks/auth';


/**
 * Component for rendering a user profile.
 * @returns {JSX.Element} - The rendered component.
 */
/**
 * Component for rendering a user profile.
 * @returns {JSX.Element} - The rendered component.
 */
const Profile = () => {
  const { id } = useParams(); // Extracting the ID parameter from the URL using the useParams hook
  const { posts, isLoading: postsLoading } = usePosts(id); // Fetching the user's posts and loading status using the usePosts hook
  const { user, isLoading: userLoading } = useUser(id); // Fetching the user data and loading status using the useUser hook
  const { user: authUser, isLoading: authLoading } = useAuth(); // Fetching the authenticated user data and loading status using the useAuth hook
  const { isOpen, onOpen, onClose } = useDisclosure(); // Managing the state of the avatar change dialog using the useDisclosure hook
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    let likes = 0;
    if (posts) {
      posts.forEach(post => {
        likes += post.likes.length;
      });
    }
    setTotalLikes(likes);
  }, [posts]);

  if (userLoading) return "Loading..."; // Display "Loading..." if the user data is still loading

  return (
    <Stack spacing="5">
      <Flex p={["4", "6"]} pos="relative" align="center">
        <Avatar size="2xl" user={user} /> {/* Render the user's avatar using the Avatar component */}
        {!authLoading && authUser.id === user.id && ( // Conditionally render the change avatar button if the authenticated user is the profile owner
          <Button
            pos="absolute"
            mb="2"
            top="6"
            right="6"
            colorScheme="teal"
            onClick={onOpen}
          >
            Change avatar
          </Button>
        )}
        <Stack ml="10">
          {/* ... */}
          <HStack spacing="10">
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Posts: {posts ? posts.length : 0}
            </Text>
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Likes: {totalLikes}
            </Text>
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Joined: {format(user.date, "MMMM yyyy")}
            </Text>
          </HStack>
        </Stack>
        <EditProfile isOpen={isOpen} onClose={onClose} /> {/* Render the EditProfile component */}
      </Flex>
      <Divider />
      {postsLoading ? (
        <Text>Posts are loading...</Text>
      ) : (
        <PostsList posts={posts} /> 
      )}
    </Stack>
  );
};

export default Profile;