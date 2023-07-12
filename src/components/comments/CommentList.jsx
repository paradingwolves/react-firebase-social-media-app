import { Box } from "@chakra-ui/react";
import Comment from "./Comment";
import { useComments } from "../../hooks/comments";

/**
 * Component for rendering a list of comments for a post.
 * @param {Object} post - The post object.
 * @returns {JSX.Element} - The rendered component.
 */
export default function CommentList({ post }) {
  const { id } = post; // Extracting the post ID from the post object
  const { comments, isLoading } = useComments(id); // Fetching the comments and loading status using the useComments hook

  if (isLoading) return "Loading..."; // Display "Loading..." if the comments are still loading

  return (
    <Box>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} /> // Rendering the Comment component for each comment
      ))}
    </Box>
  );
}
