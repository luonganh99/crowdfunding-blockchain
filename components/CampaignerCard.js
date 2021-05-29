import { Avatar, Box, Button, Center, Heading, Text, useColorModeValue } from '@chakra-ui/react';

export default function CampaignerCard() {
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
                        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                    }
                    alt={'Avatar Alt'}
                    mb={4}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    Lindsey James
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    Campaigner
                </Text>

                <Button
                    width="36"
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500'
                    }}
                    _focus={{
                        bg: 'blue.500'
                    }}>
                    Message
                </Button>
            </Box>
        </Center>
    );
}
