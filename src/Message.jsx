import React from 'react';
import { HStack, Avatar, Text, VStack } from '@chakra-ui/react'

const Message = ({ text, uri, name, user = "other" }) => {
    return (
        <HStack alignSelf={user === "me" ? "flex-end" : "flex-start"} paddingX={user === "me" ? "4" : "2"} paddingY={2} borderRadius={"base"} bg={"gray.100"}>
            {
                user === "other" ?
                    <HStack>
                        <Avatar src={uri} />
                        <VStack>
                            <Text>{name}</Text>
                            <Text>{text}</Text>
                        </VStack>
                    </HStack> : <HStack>
                        <VStack>
                            <Text>{name}</Text>
                            <Text>{text}</Text>
                        </VStack>
                        <Avatar src={uri} />
                    </HStack>
            }
        </HStack>
    )
}

export default Message;