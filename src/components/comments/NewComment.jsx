import React from 'react';
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import Avatar from '../profile/Avatar';
import { useAuth } from '../../hooks/auth';
import { useForm } from 'react-hook-form';
import { useAddComment } from '../../hooks/comments';

/**
 * Component for adding a new comment to a post.
 * @param {Object} post - The post object to which the comment will be added.
 * @returns {JSX.Element} - The rendered component.
 */
const NewComment = ({ post }) => {
  const { id: postID } = post; // Extracting the post ID from the post object
  const { user, isLoading: authLoading } = useAuth(); // Fetching the authenticated user and loading status using the useAuth hook
  const { register, handleSubmit, reset } = useForm(); // Initializing form functionality using the useForm hook
  const { addComment, isLoading: commentLoading } = useAddComment({ // Fetching the addComment function and loading status using the useAddComment hook
    postID,
    uid: user?.id,
  });

  /**
   * Handler for adding a new comment.
   * @param {Object} data - The comment data.
   */
  function handleAddComment(data) {
    addComment(data.text); // Calling the addComment function with the comment text
    reset(); // Resetting the form after submitting the comment
  }

  if (authLoading) return "Loading..."; // Display "Loading..." if the authentication data is still loading

  return (
    <Box maxW="600px" mx="auto" py="6">
      <Flex padding="4">
        <Avatar user={user} size="sm" /> {/* Displaying the user's avatar */}
        <Box flex="1" ml="4">
          <form onSubmit={handleSubmit(handleAddComment)}> {/* Setting up the form submission handler */}
            <Box>
              <Input
                size="sm"
                variant="flushed"
                placeholder="Write comment..."
                autoComplete="off"
                {...register("text", { required: true })}
              /> {/* Creating an input field for the comment text */}
            </Box>
            <Flex pt="2">
              <Button
                isLoading={commentLoading || authLoading} // Displaying a loading state for the button if either the comment or authentication data is still loading
                type="submit"
                colorScheme="teal"
                size="xs"
                ml="auto"
              >
                Add Comment
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default NewComment;
