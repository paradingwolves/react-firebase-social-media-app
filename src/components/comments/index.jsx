import { Box } from '@chakra-ui/react';
import React from 'react';
import Post from '../post';
import { usePost } from '../../hooks/posts';
import { useParams } from 'react-router-dom';
import NewComment from './NewComment';
import CommentList from './CommentList';

const Comments = () => {
  const {id} = useParams(); // the value of id depends on what you name the id in the COMMENTS route ("/protected/comments/:id") params = id
  const {post, isLoading} = usePost(id);
  
  
  if (isLoading) return "Loading post";

  return <Box align="center" pt="50">
    <Post post={post}/>
      <NewComment post={post} />
      <CommentList post={post} />
  </Box>
}

export default Comments;
