import React from 'react'
import { Box, Button, HStack, Heading, Textarea } from '@chakra-ui/react';
import TextAreaAutoSize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import useAddPost from '../../hooks/posts';
import { useAuth } from '../../hooks/auth';

const Dashboard = () => {
  const {register, handleSubmit, reset} = useForm();
  const {addPost, isLoading: addingPost} = useAddPost();
  const {user, isLoading: authLoading} = useAuth();

  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,

    })
    console.log(data);
    reset();
  }

  return (
    <Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between">
          <Heading size="lg">New Post</Heading>
          <Button colorScheme="teal" type="submit" isLoading={authLoading || addingPost} loadingText="Loading">Post</Button>
        </HStack>
        <Textarea as={TextAreaAutoSize} resize="none" mt="5" placeholder="Create a new post..." minRows={3} {...register("text", {required: true})}/>
      </form>
    </Box>
  )
}

export default Dashboard;
