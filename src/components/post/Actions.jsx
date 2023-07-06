import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { FaRegHeart, FaHeart, FaComment, FaRegComment } from "react-icons/fa";
import { useAuth } from '../../hooks/auth';
import { useToggleLike } from '../../hooks/posts';

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
                   /*  onClick={toggleLike}
                    isLoading={likeLoading || userLoading} */
                    size="md"
                    colorScheme="teal"
                    variant="ghost"
                    /* icon={isLiked ? <FaComment /> : <FaRegComment />} */
                    icon={<FaComment />}
                />
                {likes.length} {/* Display the number of likes */}
            </Flex>
        </Flex>
    );
};

export default Actions;
