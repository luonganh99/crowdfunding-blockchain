import { Avatar, Box, Button, Center, Heading, Text, useColorModeValue } from '@chakra-ui/react';

export default function CampaignerCard({ campaigner }) {
    return (
        <Center>
            <Box
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    src={
                        'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/scientist_einstein_avatar_professor-512.png'
                    }
                    alt={'Avatar Alt'}
                    mb={4}
                />
                <Heading
                    fontSize="xl"
                    fontFamily="body"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    w="320px">
                    {campaigner}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    Campaigner
                </Text>
            </Box>
        </Center>
    );
}
