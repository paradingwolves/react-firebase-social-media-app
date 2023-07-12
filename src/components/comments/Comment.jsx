import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import Avatar from "../profile/Avatar";
import UsernameButton from "../profile/UsernameButton";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../../hooks/auth";
import { useDeleteComment } from "../../hooks/comments";
import { useUser } from "../../hooks/users";
import { FaTrash } from "react-icons/fa";


/**
 * Component for rendering a comment.
 * @param {Object} comment - The comment object.
 * @returns {JSX.Element} - The rendered component.
 */
export default function Comment({ comment }) {
  const { text, uid, date, id } = comment; // Extracting properties from the comment object
  const { user, isLoading: userLoading } = useUser(uid); // Fetching the user data and loading status using the useUser hook
  const { user: authUser, isLoading: authLoading } = useAuth(); // Fetching the authenticated user data and loading status using the useAuth hook
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id); // Fetching the deleteComment function and loading status using the useDeleteComment hook

  if (userLoading) return "Loading..."; // Display "Loading..." if the user data is still loading

  return (
    <Box px="4" py="2" maxW="600px" mx="auto" textAlign="left">
      <Flex pb="2">
        <Avatar user={user} size="sm" /> {/* Displaying the avatar of the user who made the comment */}
        <Box flex="1" ml="4">
          <Flex borderBottom="1px solid" borderColor="teal.100" pb="2">
            <Box>
              <UsernameButton user={user} /> {/* Rendering a button with the username of the user */}
              <Text fontSize="xs" color="gray.500">
                {formatDistanceToNow(date)} ago {/* Displaying the time elapsed since the comment was made */}
              </Text>
            </Box>
            {!authLoading && authUser.id === uid && ( // Conditionally rendering a delete button if the authenticated user is the author of the comment
              <IconButton
                size="sm"
                ml="auto"
                icon={<FaTrash />}
                colorScheme="red"
                variant="ghost"
                isRound
                onClick={deleteComment} // Triggering the deleteComment function when the button is clicked
                isLoading={deleteLoading} // Displaying a loading state for the button if it is currently deleting the comment
              />
            )}
          </Flex>
          <Box pt="2" fontSize="sm">
            <Text>{text}</Text> {/* Displaying the comment text */}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
