import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Post from './index';

/**
 * Component for rendering a list of posts.
 * @param {Array} posts - An array of post objects.
 * @returns {JSX.Element} - The rendered component.
 */
export default function PostsList({ posts }) {
  return (
    <Box px="4" align="center">
      {posts?.length === 0 ? (
        // Display a message when there are no posts
        <Text textAlign="center" fontSize="xl">
          No posts yet... Feeling a little lonely here.
        </Text>
      ) : (
        // Iterate over the posts and render the Post component for each post
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}
