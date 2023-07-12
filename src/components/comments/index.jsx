import { Box } from '@chakra-ui/react';
import React from 'react';
import Post from '../post';
import { usePost } from '../../hooks/posts';
import { useParams } from 'react-router-dom';
import NewComment from './NewComment';
import CommentList from './CommentList';

/**
 * Component for rendering comments for a specific post.
 * @returns {JSX.Element} - The rendered component.
 */
const Comments = () => {
  const { id } = useParams(); // Extracting the ID parameter from the URL using the useParams hook
  const { post, isLoading } = usePost(id); // Fetching the post data and loading status using the usePost hook

  if (isLoading) return "Loading post"; // Display "Loading post" if the post data is still loading

  return (
    <Box align="center" pt="50">
      <Post post={post} /> {/* Render the Post component for the post */}
      <NewComment post={post} /> {/* Render the NewComment component for the post */}
      <CommentList post={post} /> {/* Render the CommentList component for the post */}
    </Box>
  );
}

export default Comments;
