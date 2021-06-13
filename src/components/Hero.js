import { Button, Center, Container, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function CallToActionWithIllustration() {
    return (
        <Container maxW={'5xl'}>
            <Stack textAlign={'center'} align={'center'} spacing={{ base: 8, md: 8 }} py={{ base: 5, md: 8 }}>
                <Heading fontWeight={600} fontSize="5xl" lineHeight={'110%'}>
                    Smart Contract-Based{' '}
                    <Text as={'span'} color={'orange.400'}>
                        CrowdFunding
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    A new way of crowdfunding project via ethereum smart contract blockchain technology without any
                    middleman to function or to manage a user’s information.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Button
                        rounded={'full'}
                        px={6}
                        colorScheme={'orange'}
                        bg={'orange.400'}
                        _hover={{ bg: 'orange.500' }}>
                        New Campaign
                    </Button>
                    <Button rounded={'full'} px={6}>
                        Find your Campaign
                    </Button>
                </Stack>
                <Center>
                    <Image src="/image_1.jpg" alt="Picture of the author" width="700px" height="380px" />
                </Center>
            </Stack>
        </Container>
    );
}
