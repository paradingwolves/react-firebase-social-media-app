import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { FaRegHeart, FaHeart, FaComment, FaRegComment, FaTrashAlt } from "react-icons/fa";
import { useAuth } from '../../hooks/auth';
import { useToggleLike, useDeletePost } from '../../hooks/posts';
import { Link } from 'react-router-dom';
import { PROTECTED } from '../../lib/routes';

/**
 * Component for rendering actions related to a post, such as liking.
 * @param {Object} post - The post object containing information about the post.
 * @returns {JSX.Element} - The rendered component.
 */
const Actions = ({ post }) => {
    const {id, likes } = post; // Destructuring the post object to get the 'likes' attribute
    const {user, isLoading: userLoading} = useAuth();

    const isLiked = likes.includes(user?.id); // variable to indicate if the post is liked

    const {toggleLike, isLoading: likeLoading } = useToggleLike({id, isLiked, uid: user?.id});

    const  {deletePost, isLoading: deleteLoading } = useDeletePost(id);
    
    
    return (
        <Flex p="2">
            <Flex alignItems="center">
                <IconButton
                    onClick={toggleLike}
                    isLoading={likeLoading || userLoading}
                    size="md"
                    colorScheme="red"
                    variant="ghost"
                    icon={isLiked ? <FaHeart /> : <FaRegHeart />}
                />
                {likes.length} {/* Display the number of likes */}
            </Flex>
            <Flex alignItems="center" ml="2">
                <IconButton
                    as={Link}
                    to={`${PROTECTED}/comments/${id}`}
/*                     isLoading={likeLoading || userLoading} */
                    size="md"
                    colorScheme="teal"
                    variant="ghost"
                    /* icon={isLiked ? <FaComment /> : <FaRegComment />} */
                    icon={<FaRegComment />}
                />
                5{/* {comments.length} */} {/* Display the number of comments */}
            </Flex>
            <Flex alignItems="center" ml="2">
                <IconButton
                    ml="auto"
                    onClick={deletePost}
                   /*  isLoading={likeLoading || userLoading} */
                    size="md"
                    colorScheme="red"
                    variant="ghost"
                    /* icon={isLiked ? <FaComment /> : <FaRegComment />} */
                    icon={<FaTrashAlt />}
                />
            </Flex>
        </Flex>
    );
};

export default Actions;
