import { Button, Center, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function CallToActionWithIllustration() {
    return (
        <Container maxW={'5xl'}>
            <Stack textAlign={'center'} align={'center'} spacing={{ base: 8, md: 8 }} py={{ base: 5, md: 8 }}>
                <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
                    Meeting scheduling{' '}
                    <Text as={'span'} color={'orange.400'}>
                        made easy
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Never miss a meeting. Never be late for one too. Keep track of your meetings and receive smart
                    reminders in appropriate times. Read your smart “Daily Agenda” every morning.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Button
                        rounded={'full'}
                        px={6}
                        colorScheme={'orange'}
                        bg={'orange.400'}
                        _hover={{ bg: 'orange.500' }}>
                        Get started
                    </Button>
                    <Button rounded={'full'} px={6}>
                        Learn more
                    </Button>
                </Stack>
                <Center>
                    <Image src="/image_1.jpg" alt="Picture of the author" width="700px" height="380px" />
                </Center>
            </Stack>
        </Container>
    );
}
