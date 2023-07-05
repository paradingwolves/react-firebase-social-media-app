import { Box, Text } from "@chakra-ui/react";
import Header from "./Header";
export default function Post({ post }) {
    const {uid, text, date} = post;

    return (
        <Box p="2" maxW="600px">
            <Box border="2px solid" borderColor="gray.100" borderRadius="md">
                <Header uid={uid} date={date}/> {/* Call the Header component created in /post/ */}
                <Text wordBreak="break-word" font-size="md">
                    {text}
                </Text>
            </Box>
        </Box>
    );
}